# 系统架构

GreenPilot 采用分层架构设计，从设备接入到智能决策形成完整闭环。

## 架构总览

```text
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│         Vue3 · ECharts · Cesium · ThreeJS               │
├─────────────────────────────────────────────────────────┤
│                    API Gateway                          │
├─────────────────────────────────────────────────────────┤
│                   AI Agent Layer                        │
│   Environment · Energy · Carbon · Crop · Report · Robot │
├─────────────────────────────────────────────────────────┤
│    LLM Service          │         RAG                   │
│  DeepSeek · Qwen · OpenAI│  温室·作物·能耗·病虫害知识库  │
├─────────────────────────────────────────────────────────┤
│                    MCP Layer                            │
│     Weather · Energy · Robot · Camera · Sensor          │
├─────────────────────────────────────────────────────────┤
│                  Business Service                       │
│   Energy · Carbon · Device · Alarm · Irrigation · Report│
├─────────────────────────────────────────────────────────┤
│                   IoT Platform                          │
│          MQTT · Modbus · OPC-UA · HTTP                  │
├─────────────────────────────────────────────────────────┤
│                      Device                             │
│  温湿度·光照·CO₂·EC·pH·光伏·储能·补光灯·农业机器人      │
├─────────────────────────────────────────────────────────┤
│                       Data                              │
│     PostgreSQL · TimescaleDB · Redis · MinIO · Milvus   │
└─────────────────────────────────────────────────────────┘
```

***

## 前端层

| 技术      | 用途         |
| ------- | ---------- |
| Vue3    | 主框架        |
| ECharts | 数据可视化      |
| Cesium  | 数字孪生 3D 场景 |
| ThreeJS | 3D 渲染引擎    |

***

## AI Agent 层

| Agent             | 职责        |
| ----------------- | --------- |
| Environment Agent | 环境监测与调控建议 |
| Energy Agent      | 能源优化调度    |
| Carbon Agent      | 碳排放管理     |
| Crop Agent        | 作物生长管理    |
| Report Agent      | 报告生成      |
| Robot Agent       | 机器人协同控制   |

***

## LLM 服务

支持多种大语言模型：

- **DeepSeek** — 国产高性能模型
- **Qwen** — 阿里通义千问
- **OpenAI** — GPT 系列

***

## RAG 知识库

| 知识库    | 内容          |
| ------ | ----------- |
| 温室知识库  | 温室环境控制、设备管理 |
| 作物知识库  | 作物生长、病虫害防治  |
| 能耗知识库  | 能源管理、节能策略   |
| 病虫害知识库 | 病虫害识别与防治方案  |

***

## MCP 协议层

| MCP 服务      | 功能      |
| ----------- | ------- |
| Weather MCP | 天气数据接入  |
| Energy MCP  | 能源数据管理  |
| Robot MCP   | 机器人通信   |
| Camera MCP  | 视频流处理   |
| Sensor MCP  | 传感器数据采集 |

***

## 业务服务层

| 服务                 | 功能    |
| ------------------ | ----- |
| Energy Service     | 能源管理  |
| Carbon Service     | 碳资产管理 |
| Device Service     | 设备管理  |
| Alarm Service      | 告警服务  |
| Irrigation Service | 灌溉管理  |
| Report Service     | 报告服务  |

***

## IoT 平台

支持多种协议接入：

| 协议     | 应用场景           |
| ------ | -------------- |
| MQTT   | 轻量级传感器数据       |
| Modbus | 工业设备通信         |
| OPC-UA | 标准工业协议         |
| HTTP   | RESTful API 接入 |

***

## 设备接入

| 类别    | 设备               |
| ----- | ---------------- |
| 环境传感器 | 温湿度、光照、CO₂、EC、pH |
| 能源设备  | 光伏逆变器、储能系统       |
| 控制设备  | 补光灯              |
| 移动设备  | 农业机器人            |

***

## 数据存储

| 数据库         | 用途         |
| ----------- | ---------- |
| PostgreSQL  | 关系型数据      |
| TimescaleDB | 时序数据（传感器）  |
| Redis       | 缓存与会话      |
| MinIO       | 对象存储（图像）   |
| Milvus      | 向量数据库（RAG） |
