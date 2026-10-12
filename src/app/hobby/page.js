import HobbySection from "@/components/HobbySection";
import styles from "../page.module.css";

export const metadata = { title: "Hobby | Dr. Shivam Singh" };

export default function HobbyPage() {
  return <div className={styles.sections}><HobbySection /></div>;
}
