<template>
    <div id="healthBar" >
        <div class="healthBarStatus"></div>
    </div>
</template>


<style>
  #healthBar{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 20px;
    background-color: rgba(0,0,0,0.45);
    border: 2px solid rgba(0,0,0,1);
    border-radius: 0px 5px 5px 0px;
  }
  .healthBarStatus{
    width: 40%;
    height: 100%;
    border-radius: 0px 5px 5px 0px;
    background-color: red;

  }
</style>
