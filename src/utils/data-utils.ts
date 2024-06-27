import { isRGB, type RGB as RGBType, type User, type InitData } from "@tma.js/sdk-react";
import type { FC, ReactNode } from "react";

interface DisplayDataRow {
  title: string;
  value?: RGBType | string | boolean | ReactNode;
}

export function getUserRows(user: User): DisplayDataRow[] {
  // console.log(user);
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
    { title: "allows_to_write_to_pm", value: user.allowsWriteToPm },
    { title: "added_to_attachment_menu", value: user.addedToAttachmentMenu },
  ];
}
