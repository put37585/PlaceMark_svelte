<script>
  import {getContext, onMount} from "svelte";
  import {push} from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListCategories from "../components/ListCategories.svelte";
  import AddCategory from "../components/AddCategory.svelte";

  const placeMarkService = getContext("PlaceMarkService");
  const savedUser = {};
  let message = "";
  let categoryList = [];

  async function addCategory(categoryTitle) {
    if (savedUser) {
      const newCategory = await placeMarkService.createCategory({title: categoryTitle, userid: savedUser.id});
      categoryList.push(newCategory);
      categoryList = [...categoryList];
    } else {
      message = "Please login first";
    }
  }

  async function deleteCategory(id) {
    await placeMarkService.deleteCategory(id);
    categoryList = await placeMarkService.getUserCategories(savedUser.id);
  }

  onMount(async () => {
    const placeMarkCredentials = localStorage.placeMark;
    if (placeMarkCredentials) {
      const tempUser = JSON.parse(placeMarkCredentials);
      savedUser.id = tempUser.id;
      savedUser.token = tempUser.token;
      savedUser.email = tempUser.email;
    } else {
      push("/login");
    }

    categoryList = await placeMarkService.getUserCategories(savedUser.id);
  });
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Please make a Donation"} title={"Donation Services Inc."} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="box has-text-centered">
  <ListCategories {categoryList} deleteCategoryHandler={deleteCategory} />
  <AddCategory addCategoryHandler={addCategory} {message} />
</div>
