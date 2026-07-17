import { ShieldCheck, Mail, FileText } from "lucide-react";

const features = [
  {
    title: "Submission Review",
    description:
      "Every submission undergoes an initial review to verify formatting, file integrity, and compliance with repository guidelines before publication.",
    icon: ShieldCheck,
    iconColor: "text-amber-700",
  },
  {
    title: "Author Communication",
    description:
      "Readers can contact authors directly using the provided email addresses to ask questions, share insights, or discuss research collaborations.",
    icon: Mail,
    iconColor: "text-blue-600",
  },
  {
    title: "Multiple File Formats",
    description:
      "Upload and access research papers in widely supported formats, including PDF, Microsoft Word (.docx, .doc), and other approved document types.",
    icon: FileText,
    iconColor: "text-emerald-700",
  },
];