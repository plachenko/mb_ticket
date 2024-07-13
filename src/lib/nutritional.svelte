<script>
  // Dummy data for nutritional values
  export let servingSize = "1 Cup (228g)";
  export let calories = 200;
  export let totalFat = 8;
  export let saturatedFat = 1;
  export let transFat = 0;
  export let cholesterol = 0;
  export let sodium = 160;
  export let totalCarbs = 31;
  export let dietaryFiber = 4;
  export let sugars = 5;
  export let protein = 3;
  export let vitamins = [
    "Vitamin A 10%",
    "Vitamin C 20%",
    "Calcium 15%",
    "Iron 10%",
  ];
</script>

<div class="label w-[40px]">
  <div class="label-heading">Nutrition Facts</div>
  <div class="label-subheading">Serving Size: {servingSize}</div>

  <div class="label-section">
    <div>
      <span>Calories</span>
      <span>{calories}</span>
    </div>
  </div>

  <div class="label-section">
    <div class="label-nutrient">
      <span>Total Fat</span>
      <span>{totalFat}g</span>
    </div>
    <div class="label-nutrient">
      <span>Saturated Fat</span>
      <span>{saturatedFat}g</span>
    </div>
    <div class="label-nutrient">
      <span>Trans Fat</span>
      <span>{transFat}g</span>
    </div>
  </div>

  <div class="label-section">
    <div class="label-nutrient">
      <span>Cholesterol</span>
      <span>{cholesterol}mg</span>
    </div>
  </div>

  <div class="label-section">
    <div class="label-nutrient">
      <span>Sodium</span>
      <span>{sodium}mg</span>
    </div>
  </div>

  <div class="label-section">
    <div class="label-nutrient">
      <span>Total Carbohydrate</span>
      <span>{totalCarbs}g</span>
    </div>
    <div class="label-nutrient">
      <span>Dietary Fiber</span>
      <span>{dietaryFiber}g</span>
    </div>
    <div class="label-nutrient">
      <span>Sugars</span>
      <span>{sugars}g</span>
    </div>
  </div>

  <div class="label-section">
    <div class="label-nutrient">
      <span>Protein</span>
      <span>{protein}g</span>
    </div>
  </div>

  <div class="label-section">
    {#each vitamins as vitamin}
      <div class="label-nutrient">{vitamin}</div>
    {/each}
  </div>
</div>

<!--
  You can then use this component in your main App.svelte file or any other component:
  
  <script>
    import NutritionLabel from './NutritionLabel.svelte';
  
    // Pass down the nutritional values as props
    let servingSize = "1 Cup (228g)";
    let calories = 200;
    let totalFat = 8;
    let saturatedFat = 1;
    let transFat = 0;
    let cholesterol = 0;
    let sodium = 160;
    let totalCarbs = 31;
    let dietaryFiber = 4;
    let sugars = 5;
    let protein = 3;
    let vitamins = ["Vitamin A 10%", "Vitamin C 20%", "Calcium 15%", "Iron 10%"];
  </script>
  
  <main>
    <NutritionLabel
      {servingSize}
      {calories}
      {totalFat}
      {saturatedFat}
      {transFat}
      {cholesterol}
      {sodium}
      {totalCarbs}
      {dietaryFiber}
      {sugars}
      {protein}
      {vitamins} />
  </main>
  -->

<style>
  .label {
    width: 100%;
    font-family: Arial, sans-serif;
    border: 1px solid #000;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .label-heading,
  .label-subheading {
    font-weight: bold;
  }

  .label-heading {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .label-subheading {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .label-section {
    margin-bottom: 10px;
  }

  .label-section div {
    display: flex;
    justify-content: space-between;
  }

  .label-section div span {
    font-weight: bold;
  }

  .label-nutrient {
    font-size: 12px;
  }
</style>

