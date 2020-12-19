export default function({ route, store, redirect }) {
  // If the user is not authenticated
  const authPage = route.name == "auth";
  const isAuth = store.state.isAuthenticated;
  console.log(authPage);
  console.log(isAuth);
  if (isAuth == false && !authPage) {
    return redirect("/auth");
  }
}
