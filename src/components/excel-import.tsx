import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useImportUsers } from "@/hooks/useImportUsers";
import { toast } from "sonner";

interface ExcelImportProps {
  templateUrl: string;
  role: "PROFESSOR" | "STUDENT";
  onSuccess: () => void;
}

export function ExcelImport({
  templateUrl,
  role,
  onSuccess
}: ExcelImportProps) {
  const importMutation = useImportUsers();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        toast.error("Veuillez sélectionner un fichier Excel (.xlsx)");
        return;
      }

      try {
        await importMutation.mutateAsync({ file, role });
        toast.success("Import réussi");
        onSuccess();
      } catch (error: any) {
        toast.error(error.message || "Erreur lors de l'import du fichier");
      }
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch(templateUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `template_${role.toLowerCase()}s.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Erreur lors du téléchargement du template");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handleDownloadTemplate}>
        <Download className="mr-2 h-4 w-4" />
        Télécharger le modèle
      </Button>
      <div className="relative">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={importMutation.isPending}
        />
        <Button variant="outline" disabled={importMutation.isPending}>
          <Upload className="mr-2 h-4 w-4" />
          {importMutation.isPending
            ? "Importation..."
            : "Importer un fichier Excel"}
        </Button>
      </div>
    </div>
  );
}
