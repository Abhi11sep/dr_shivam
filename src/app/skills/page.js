import SkillsSection from "@/components/SkillsSection";
import styles from "../page.module.css";

export const metadata = { title: "Skills | Dr. Shivam Singh" };

export default function SkillsPage() {
  return <div className={styles.sections}><SkillsSection /></div>;
}
