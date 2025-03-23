import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import * as XLSX from "xlsx";

export function useImportUsers() {
    return useMutation({
        mutationFn: async ({ file, role }: { file: File; role: "PROFESSOR" | "STUDENT" }) => {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const headers = data[0] as string[];
            const expectedHeaders = role === "STUDENT"
                ? ["Prénom", "Nom", "Email", "Mot de passe", "Classe"]
                : ["Prénom", "Nom", "Email", "Mot de passe"];

            const isValidHeaders = expectedHeaders.every((header) =>
                headers.includes(header)
            );

            if (!isValidHeaders) {
                throw new Error("Format de fichier invalide");
            }

            const users = data.slice(1).map((row: any) => ({
                firstName: row[headers.indexOf("Prénom")],
                lastName: row[headers.indexOf("Nom")],
                email: row[headers.indexOf("Email")],
                password: row[headers.indexOf("Mot de passe")],
                ...(role === "STUDENT" && { className: row[headers.indexOf("Classe")] })
            }));

            const response = await axios.post(`/user/bulk/${role.toLowerCase()}s`, {
                [`${role.toLowerCase()}s`]: users
            });

            return response.data;
        }
    });
} 