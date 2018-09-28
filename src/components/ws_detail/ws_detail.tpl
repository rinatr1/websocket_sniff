<div class="ws_detail">

    <div  v-if = "edit_mode == false" class="ws_detail_show" >
        <div class="detail_header">
            Data <div class = "collapse"><button  v-on:click = "hide">»</button></div>
        </div>
        <div  v-if = "is_json == true" class = "detail_center">
            <vue-json-pretty
                    :deep=4
                    :data="item_virtual_data">
            </vue-json-pretty>
        </div>
        <div  v-else class = "detail_center">
         <textarea style="width: 100%; height: 100%"   v-model="temp_data">
            </textarea>
        </div>

        <div class="detail_footer">
          <!--  <button v-on:click="edit()">Edit and Send</button> !-->
        </div>
    </div>
    <div v-else class="ws_detail_show">
        <div class="detail_header">
            Data  <div class = "collapse"><button v-on:click = "edit_mode = false">x</button></div>
        </div>
        <div class = "detail_center">
              <textarea style="width: 100%; height: 100%"   v-model="temp_data">
            </textarea>
        </div>
        <div class="detail_footer">
            <button v-on:click="send()">Send (new session)</button>
        </div>

    </div>

</div>