import { pageMetadata } from "@/lib/seo";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata = pageMetadata("/gallery");

export default function GalleryPage() {
  return <PhotoGallery />;
}
