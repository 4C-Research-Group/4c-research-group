export async function fullSignOut(
  signOut: () => Promise<void>,
  onClick?: () => void
) {
  await signOut();
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  // Stay on current page instead of redirecting to home
  window.location.reload();
  onClick?.();
}
