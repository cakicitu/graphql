<template>
<!--  <div class="container" style="margin: 10px" >-->
    <div class="form">
      <input  class="input" :type="type" placeholder=" "  >
      <label  class="label">{{label}}</label>
      <i v-if="success" class="fa fa-check" aria-hidden="true"></i>
      <i v-if="success" class="fa fa-check" aria-hidden="true"></i>
      <i v-else class="fa fa-times" aria-hidden="true"></i>
    </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "TInput",
  data(){
    return{
      defaultWidth: '25px'
    }
  },
  props: {
    label: {
      default: '',
      required: true
    },
    type: {
      default: 'text',
    },
    success: {
      default: false,
    },
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
//Input

*{
  --input-color: #80868B;

  --normal-font-size: 16px;
  --small-font-size: 12px;
}
//.container{
  //width: 400px;
  //min-width: fit-content;
  .form{
    position: relative;
    margin: 10px;

    .input{
      width: 100%;
      height: 24px;
      font-size: var(--normal-font-size);
      border: 2px solid var(--primary);
      border-radius: 6px;
      outline: none;
      padding: 12px;
      background: none;
      z-index: 1;
      color: var(--input-color);
    }
    .label{
      pointer-events: none;
      position: absolute;
      left: 1rem;
      top: 12px;
      //top: 5px;
      padding: 0 3px;
      color: var(--input-color);
      font-size: var(--normal-font-size);
      transition: .3s;
    }
    .input:focus{
      color: var(--primary-soft)
    }


    //move up
    .input:focus + .label{
      top: -15px;
      left: 10px;
      color: var(--color-text-green);
      font-size: var(--small-font-size);
      font-weight: 500;
      z-index: 10;
    }

    //stick top
    .input:not(:placeholder-shown).input:not(:focus)+ .label{
      top: -15px;
      left: 10px;
      font-size: var(--small-font-size);
      font-weight: 500;
      z-index: 10;
    }
    .input:focus{
      border: 1.5px solid var(--color-text-green);
    }
    .input:focus ~ .fa-check
    {
      color: var(--color-text-green);
    }
    .input:focus ~ .fa-times
    {
      color: red;
    }

    .fa{
      position: absolute;
      right: 22px;
      top: calc((52px - 15px) / 2);
      color: var(--input-color);
    }
  }


//}

</style>