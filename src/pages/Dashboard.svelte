<script>
  import {createEventDispatcher, getContext, onMount} from "svelte";
  import {push} from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListCategories from "../components/ListCategories.svelte";
  import AddCategory from "../components/AddCategory.svelte";
  import PlaceMarkMap from "../components/PlaceMarkMap.svelte";
  import {map} from "leaflet";
  const dispatch = createEventDispatcher();
  const placeMarkService = getContext("PlaceMarkService");
  const savedUser = {};
  let message = "";
  let categoryList = [];
  let placeMarkMap = null;

  async function addCategory(categoryTitle) {
    if (savedUser) {
      const newCategory = await placeMarkService.createCategory({title: categoryTitle, userid: savedUser.id});
      categoryList.push(newCategory);
      categoryList = [...categoryList];
      placeMarkMap.addCategory(newCategory);
    } else {
      message = "Please login first";
    }
  }

  async function deleteCategory(id) {
    await placeMarkService.deleteCategory(id);

    const found = categoryList.findIndex((category) => category._id == id);
    if (found !== -1) {
      const deletedCategory = categoryList[found];
      categoryList.splice(found, 1);
      categoryList = [...categoryList];
      
      placeMarkMap.removeCategory(deletedCategory);
    }
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
    if (!categoryList) {
      message = "No catergories, yet!";
      return;
    }
    placeMarkMap.showCategoryList(categoryList);
  });
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Add and view categories"} title={"PlaceMark Service"} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>
<div class="columns is-vcentered">
  <div class="column has-text-centered">
    <ListCategories {categoryList} deleteCategoryHandler={deleteCategory} />
    <AddCategory addCategoryHandler={addCategory} {message} />
  </div>
  <div class="column has-text-centered">
    <PlaceMarkMap bind:this={placeMarkMap} />
  </div>
</div>
