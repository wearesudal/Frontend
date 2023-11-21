<script setup></script>

<template>
  <div class="container text-center mt-3">
    <div class="alert" role="alert" style="background-color: rgb(175, 190, 207)">
      Member Service
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  mark.orange {
    background: linear-gradient(to top, rgb(175, 190, 207) 20%, transparent 30%);
  }
</style>
