import { pageMetadata } from "@/lib/seo";
import SkillsSection from "@/components/SkillsSection";
import styles from "../page.module.css";

export const metadata = pageMetadata("/skills");

export default function SkillsPage() {
  return <div className={styles.sections}><SkillsSection /></div>;
}
