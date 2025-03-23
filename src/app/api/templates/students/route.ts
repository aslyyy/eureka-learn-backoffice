import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
    // Créer un nouveau workbook
    const wb = XLSX.utils.book_new();

    // Données d'exemple
    const data = [
        ["Prénom", "Nom", "Email", "Mot de passe", "Classe"],
        ["Marie", "Martin", "marie.martin@example.com", "motdepasse123", "Classe A"]
    ];

    // Créer une worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Ajouter des styles et des validations
    ws['!cols'] = [
        { width: 15 }, // Prénom
        { width: 15 }, // Nom
        { width: 25 }, // Email
        { width: 15 }, // Mot de passe
        { width: 15 }, // Classe
    ];

    // Ajouter la worksheet au workbook
    XLSX.utils.book_append_sheet(wb, ws, "Élèves");

    // Générer le buffer
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Retourner le fichier
    return new NextResponse(buf, {
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="template_eleves.xlsx"'
        }
    });
} 