import examPortal from "../assets/images/concepts/examify.svg?no-inline";
import inventory from "../assets/images/concepts/inventory.svg?no-inline";
import lms from "../assets/images/concepts/learning.svg?no-inline";
import examPortalMobile from "../assets/images/concepts/examify-mobile.svg?no-inline";
import inventoryMobile from "../assets/images/concepts/inventory-mobile.svg?no-inline";
import lmsMobile from "../assets/images/concepts/learning-mobile.svg?no-inline";

// Original neutral UI studies, not genuine application captures. No usage metrics.
// `mobile` is the same composition re-set at 600×375 (still 8:5) so its labels render at ≥12px on phones.
const concept = (large, mobile) => ({ large, mobile, width: 960, height: 600 });
export const projectImages = {
  examPortal: concept(examPortal, examPortalMobile),
  inventory: concept(inventory, inventoryMobile),
  lms: concept(lms, lmsMobile),
};

// Verified raster screenshots can still supply responsive variants in project.visual.
export const projectImageSrcSet = image => [
  image.tiny && `${image.tiny} 320w`,
  image.small && `${image.small} 640w`,
  image.medium && `${image.medium} 960w`,
  image.small && `${image.large} ${image.width || 1280}w`,
].filter(Boolean).join(', ') || undefined;
