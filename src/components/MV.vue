<template>
  <div>
    <div class="video">
      <video :src="vaidesrc" controls="controls" width="100%"></video>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vaidesrc: '',
        playing: false,
        picurl: ''
      }
    },
    methods: {
      createGUID: function (a) {
        a = a || 32;
        for (var b = "", c = 1; a >= c; c++) {
          var d = Math.floor(16 * Math.random()).toString(16);
          b += d
        }
        return b
      },
    },
    created() {
      let guid = this.createGUID()
      this.$store
        .dispatch('getMvInfo', this.$route.params.id)
        .then(ret => {
          let data = ret.data.data
          this.picurl = data.picurl
          //console.log(data)
        })
      this.$store
        .dispatch('getMvKey', {
          id: this.$route.params.id,
          guid: guid
        })
        .then(ret => {
            console.log(ret.data)
          let key = ret.data.vl.vi[0]
          this.vaidesrc = `${key.ul.ui[0].url}/${key.fn}?vkey=${key.fvkey}&br=60&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=${guid}`
        })
    }
  }
</script>

<style lang="less" scoped>
  .video {
    position: relative;
    img {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    }
  }

</style>
