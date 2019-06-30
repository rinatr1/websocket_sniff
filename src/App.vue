<template>


  <div id="app">
    <ws_grid
      :ws_data="ws_data"
      @remove_all="remove_all"
      @ws_send="ws_send"
    />


  </div>
</template>

<script>

    import ws_grid from './components/ws_grid/ws_grid.vue';

    export default {
        name: 'Home',
        components:
            {
                ws_grid: ws_grid
            },
        data() {
            return {
                ws_data: []
            };
        },
        methods: {
            remove_all() {
                this.ws_data = [];
            },
            ws_send(item_data) {

                let d;
                try {
                    d = JSON.stringify(JSON.parse(item_data));
                } catch (e) {
                    d = item_data.toString();
                }


                this.ws_data.push({
                    type: 'to',
                    data: d,
                    length: item_data.length,
                    from_devtools: true,
                    time: new Date()
                });
            }

        },
    };


</script>
<style>

    body {
        padding: 0;
        margin: 0;
        font-family: 'helvetica neue', helvetica, arial, 'lucida grande', sans-serif;
        font-size: 12px;
    }

    #app {
        display: flex;
        flex-flow: row wrap;
        /*align-items: center;*/
        align-content: center;
        justify-content: space-between;
    }

    .grid {
        width: inherit;
        display: flex
    }

    .frame {
        width: 35%;
        display: flex;
        align-items: baseline;
        margin-top: 10px;
        position: fixed;
        right: 0px;
        top: 40px;
        height: 100%;
    }


</style>
