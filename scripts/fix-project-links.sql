-- Fix existing project links that are relative paths
-- These should be either external URLs or NULL for internal routes

UPDATE projects 
SET link = NULL 
WHERE link LIKE '/research/%'
    OR link LIKE '/%'
    OR link = '';

-- Verify the changes
SELECT id, title, link
FROM projects; 