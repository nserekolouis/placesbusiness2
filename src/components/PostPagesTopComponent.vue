<template>
    <div class="tabs">
            <div style="width:50%; display:inline-block">
                <div class="top-left"
                @click="goToHome"
                :style="{ border: topLeftColor }"
                >
                    <font-awesome-icon icon="fa-solid fa-house" />
                    <span
                    class="position-absolute top-2 start-2 translate-middle p-1 bg-places border border-light rounded-circle"
                    :style="{ backgroundColor: color }"
                    >
                    <span class="visually-hidden">New alerts</span>
                    </span>
                </div>
            </div>
            <div style="width:50%; display:inline-block">
                <div class="top-right"
                @click="goToNotifications"
                :style="{ border: topRightColor }"
                >
                    <font-awesome-icon icon="fa-solid fa-bell" />
                    <span class="badge" style="margin-left: 10px; font-size: 15px;">{{
                        nCount
                    }}</span>
                </div>
            </div>
    </div>
</template>
<script>
import { watch, ref } from "vue";

const TAG = "POST_PAGES_TOP_COMPONENT";

export default {
    name: 'PostPagesTopComponent',
    props: {
        indicator: String,
        noteCount: Number,
        LeftColor: String,
        RightColor: String
    },
    setup(props,{emit}) {
        const color = ref(props.indicator);
        const nCount = ref(props.noteCount);
        const topLeftColor = ref(props.LeftColor);
        const topRightColor = ref(props.RightColor);

        watch(() => props.LeftColor,
            (newVal, oldVal) => {
                console.log(TAG + " New Value", newVal);
                console.log(TAG + " Old Value", oldVal);
                topLeftColor.value = newVal;
        });


        watch(() => props.RightColor,
            (newVal, oldVal) => {
                console.log(TAG + " New Value", newVal);
                console.log(TAG + " Old Value", oldVal);
                topRightColor.value = newVal;
        });

        watch(() => props.indicator,
            (newVal, oldVal) => {
                console.log(TAG + " New Value", newVal);
                console.log(TAG + " Old Value", oldVal);
                color.value = newVal;
        });

        watch(() => props.noteCount,
            (newVal, oldVal) => {
                console.log("New Value", newVal);
                console.log("Old Value", oldVal);
                nCount.value = newVal;
        });

        const goToHome = () => {
            color.value = "#fff";
            emit("listen-home");
        };

        const goToNotifications = () => {
            nCount.value = 0;
            emit("listen-notifications");
        };

        return {
            color,
            nCount,
            goToHome,
            goToNotifications,
            topLeftColor,
            topRightColor
        }
    }
}
</script>
<style scoped>
p {
  display: inline;
  margin-left: 10px;
  margin-bottom: 0px;
  font-size: 15px;
}

.top{
    border: 1px solid #80808070;
    padding: 1px;
    text-align: center;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
}

.top-left{
    border: 1px solid #80808026;
    padding: 1px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 35px;
    margin-top:5px;
    margin-right:5px;
    margin-bottom: 5px;
}

.top-right{
    border: 1px solid #80808026;
    padding: 1px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 35px;
    margin-top:5px;
    margin-left:5px;
    margin-bottom: 5px;
    color: black;
}

.top-left:hover{
    background-color: #288c7f;
    color: white;
}

.badge {
    color: black;
}

.top-right:hover > .badge{
    color: white;
}

.top-right:hover{
    background-color: #288c7f;
    color: white;
}

.tabs{
    width: 90%;
    position: absolute;
    top: 0px;
    margin-left: 20px;
}

.bg-places {
  background-color: #288c7f;
}
</style>