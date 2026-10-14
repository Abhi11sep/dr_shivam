import { pageMetadata } from "@/lib/seo";
import HobbySection from "@/components/HobbySection";
import styles from "../page.module.css";

export const metadata = pageMetadata("/hobby");

export default function HobbyPage() {
  return <div className={styles.sections}><HobbySection /></div>;
}
