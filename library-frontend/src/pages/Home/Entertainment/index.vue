<template>
  <div class="entertainment-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="game in games" :key="game.name">
        <el-card class="game-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ game.name }}</span>
          </div>
          <div class="card-content">
            <img :src="game.image" class="game-image" alt="game.name">
            <p class="game-description">{{ game.description }}</p>
            <a :href="game.url" target="_blank" class="game-link">
              <el-button type="primary" plain>前往官网</el-button>
            </a>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Entertainment',
  data() {
    return {
      games: [
        {
          name: '云·原神',
          description: '无需下载完整包体，尽享低延迟、高画质、高帧率的原神游戏体验。',
          image: './images/0002.jpg', // Placeholder, using a relevant image
          url: 'https://ys.mihoyo.com/cloud/'
        },
        {
          name: '云·星穹铁道',
          description: '乘坐星穹列车穿越银河，无需下载，即刻开启你的开拓之旅。',
          image: 'https://img.zcool.cn/community/0199025e818a8da801216518431525.jpg@1280w_1l_2o_100sh.jpg', // Placeholder, using a relevant image
          url: 'https://sr.mihoyo.com/cloud/'
        },
        {
          name: '云·鸣潮',
          description: '高自由度的动作战斗玩法与丰富多样的开放世界探索。云端畅玩，无需等待。',
          image: 'https://img.zcool.cn/community/01a7f05e818a99a80120a821e78165.jpg@1280w_1l_2o_100sh.jpg', // Placeholder, using a relevant image
          url: 'https://wutheringwaves.kurogames.com/'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.entertainment-container {
  padding: 20px;
  background-color: #f9fafb;
  min-height: 70vh;
}

.game-card {
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}

.card-content {
  text-align: center;
  padding: 10px 20px 20px 20px;
}

.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.game-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
  min-height: 60px;
}

.game-link .el-button {
  width: 100%;
  border-radius: 8px;
}
</style>