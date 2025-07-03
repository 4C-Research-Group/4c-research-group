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
  window.location.href = "/";
  onClick?.();
}
