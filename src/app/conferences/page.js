import ConferencesSection from "@/components/ConferencesSection";
import styles from "../page.module.css";

export const metadata = { title: "Conferences | Dr. Shivam Singh" };

export default function ConferencesPage() {
  return <div className={styles.sections}><ConferencesSection /></div>;
}
