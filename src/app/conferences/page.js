import { pageMetadata } from "@/lib/seo";
import ConferencesSection from "@/components/ConferencesSection";
import styles from "../page.module.css";

export const metadata = pageMetadata("/conferences");

export default function ConferencesPage() {
  return <div className={styles.sections}><ConferencesSection /></div>;
}
