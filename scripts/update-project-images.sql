-- Update project images to use EEG/fNIRS cap photos for main research page
-- and move current artistic images to individual project pages

-- Update NuANCEd project
-- Change main image to EEG/fNIRS cap photo and move current image to additional images
UPDATE projects 
SET 
  image = '/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg',
  images = '["/images/project-1.png", "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg", "/images/placeholder.jpg"]'
WHERE slug = 'nuanced';

-- Update TraNSIEnCe project  
-- Change main image to EEG/fNIRS cap photo and move current image to additional images
UPDATE projects 
SET 
  image = '/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg',
  images = '["/images/project-2.jpg", "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg", "/images/placeholder.jpg"]'
WHERE slug = 'transience';

-- Update PREDICT ABI project
-- Change main image to EEG/fNIRS cap photo and move current image to additional images
UPDATE projects 
SET 
  image = '/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg',
  images = '["/images/project-3.png", "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg", "/images/placeholder.jpg"]'
WHERE slug = 'predict-abi';

-- Keep ABOVE and NORSE as they are (they work well together)
-- No changes needed for these projects

-- Verify the changes
SELECT slug, title, image, images
FROM projects
ORDER BY slug; 