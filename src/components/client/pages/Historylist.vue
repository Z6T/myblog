<style lang='scss' scoped>
.home-page {
  .yearlist {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    section {
      padding: 10px 20px 0;
      .yeartitle-list {
        list-style: square;
        margin-left: 20px;
        margin-bottom: 0;
        li {
          height: 38px;
          position: relative;
          list-style: none;
          margin: 10px 0;
          &:first-child {
            .circle {
              width: 30px;
              height: 30px;
              position: absolute;
              top: -19px;
              left: 30px;
              background: url("../../../assets/imgs/timesub.png") no-repeat;
            }
          }
          &:not(:first-child) {
            .circle {
              width: 16px;
              height: 16px;
              position: absolute;
              top: -15px;
              left: 35px;
              border: 1px solid #969191;
              border-radius: 50%;
              transition: all 0.5s;
              &:hover {
                background: #622954;
                cursor: pointer;
                transform: scale(1.5);
              }
            }
          }
          &:last-child {
            .timeline {
              display: inline-block;
              width: 100px;
              position: relative;
              .line {
                position: absolute;
                height: 0px;
                width: 1px;
                top: 5px;
                left: 43px;
                background: red;
              }
            }
          }
          &:not(:last-child) {
            .timeline {
              display: inline-block;
              width: 100px;
              position: relative;
              .line {
                position: absolute;
                height: 26px;
                width: 1px;
                top: 5px;
                left: 43px;
                background: #622954;
              }
            }
          }
          .pubsate {
            display: inline-block;
          }

          a {
            display: inline-block;
            text-decoration: none;
            color: #330033;
            font-weight: bold;
          }
        }
        li:last-child {
          height: 10px;
          position: relative;
          list-style: none;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
<template>
  <div class="home-page mainbody" id="xxxFullScreen">
    <div class="yearlist">
      <Htitle>时光轴</Htitle>
      <div v-if="!timelinedata.length" class="loading">
        <i class="el-icon-loading"></i>
        loading...
      </div>
      <section class="oneyear-list" v-for="(item,key) in timelinedata" :key="key" v-else>
        <h4 style="font-size: 18px;margin: 23px 0px;font-family: serif;">{{item[0].a_pubdate}}</h4>
        <ul class="yeartitle-list">
          <li v-for="liitem in item" :key="liitem._id">
            <span class="pubsate">{{liitem.a_pubdate}}</span>
            <div class="timeline">
              <div class="circle"></div>
              <div class="line"></div>
            </div>
            <router-link :to="'/archives/'+liitem._id" class="arti-title" href>{{liitem.a_title}}</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import Htitle from "../components/Htitle";
export default {
  data() {
    return {
      timelinedata: []
    };
  },
  components: { Htitle },
  created() {
    this.apis
      .timeline({})
      .then(data => {
        if (data.data) {
          console.log(data.data);
          const timelinedata = data.data; // 排序后的
          var a = [],
            result = [];
          timelinedata.forEach((element, i) => {
            if (a.length === 0) {
              a.push(element);
            } else if (
              element.a_pubdate.substring(0, 7) !==
              a[a.length - 1].a_pubdate.substring(0, 7)
            ) {
              result.push(a);
              a = [];
              a.push(element);
              if (i === timelinedata.length - 1) result.push(a);
            } else {
              a.push(element);
            }
          });
          this.timelinedata = result;
        }
      })
      .catch(err => console.log(err));
  }
};
</script>
