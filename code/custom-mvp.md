# 自研 MVP 技术方案

> \[!TIP] 目标
> 可执行的技术实现逻辑与 MVP（最小可行性产品）实施路径。

***

## MVP 分期落地路径

### 阶段 1：感知与 RAG 问答

> 核心跑通，可用于 Demo

**目标**：跑通传感器数据上传 + 大模型基于专业农业知识回答问题。

| 步骤     | 技术选型                | 说明                                     |
| ------ | ------------------- | -------------------------------------- |
| IoT 接入 | EMQX / Node-RED     | 模拟虚拟传感器（温湿度、光照）定时发送 JSON 数据            |
| 数据存储   | Redis + TimescaleDB | Redis 供前端实时展示，TimescaleDB 存储历史数据       |
| RAG 搭建 | Dify / FastGPT      | 接入 DeepSeek API，上传种植指南 PDF，底层对接 Milvus |
| 前端展示   | Vue3 + ECharts      | 读取 Redis 数据展示大屏，嵌入 Dify Chatbox        |

> \[!TIP] 阶段成果
> 此时你已经有了一个"能看数据、能懂农业"的单体 Copilot。

***

### 阶段 2：MCP 工具链与 Agent 决策

> 体现核心差异化

**目标**：让大模型不仅能聊天，还能"看"实时数据并"控制"设备。

**实现逻辑**：

1. **编写 MCP Server**（Node.js / Python）

   | 工具                      | 功能              |
   | ----------------------- | --------------- |
   | `get_current_weather()` | 调用天气 API 获取气象数据 |
   | `get_greenhouse_temp()` | 查询 Redis 获取温室温度 |
   | `turn_on_fan()`         | 向 MQTT 发送控制指令   |

2. **Agent 框架集成**：使用 **LangGraph** 或 **CrewAI** 将 MCP 工具赋能给大模型

3. **触发逻辑示例**：
   - 用户："今天适合补光吗？"
   - Agent → 调用天气 MCP 查下午天气
   - Agent → 调用传感器 MCP 查当前光照
   - Agent → 结合 RAG 知识库给出建议
   - 询问"是否开启补光灯？"
   - 用户确认 → 调用设备控制 MCP

***

### 阶段 3：多 Agent 协同与数字孪生

> 后续演进

**目标**：复杂决策自动化与 3D 可视化。

| 模块         | 实现方式                                                                   |
| ---------- | ---------------------------------------------------------------------- |
| 多 Agent 对话 | LangGraph 定义不同 Persona（环境专家、能源管家），复杂告警时 Agent 间"讨论"权重，输出综合决策报告         |
| 数字孪生       | Cesium/Three.js 加载温室 3D 模型（gltf/glb），设备状态与 MQTT 绑定（如风机 ON → 3D 扇叶旋转动画） |

***

## 技术干货补充

### 数据流转图

异常降温触发自动策略的流转逻辑：

```text
传感器 → (MQTT) → IoT网关 → (写入) TimescaleDB
→ (触发阈值告警) → Alarm Service
→ (唤醒) Environment Agent
→ (调用RAG查阅防冻策略)
→ (生成决策建议并推给前端)
→ 农场主点击执行
→ (调用MCP) → IoT平台
→ (Modbus下发) → 开启加热机
```

### Agent 协同架构

| 配置项                 | 建议                                                                 |
| ------------------- | ------------------------------------------------------------------ |
| Energy Agent Prompt | "你是温室能源分析师，需基于峰谷电价和光伏预测，最小化用电成本..."                                |
| 通信机制                | 初期采用 **Manager-Worker** 架构（一个 Manager Agent 分发任务，底层 Agent 执行，最后汇总） |

### MCP 工具定义示例

```json
{
  "name": "control_device",
  "description": "控制温室内的物理设备开关",
  "parameters": {
    "type": "object",
    "properties": {
      "device_id": { "type": "string", "description": "设备ID，如 fan_01" },
      "action": { "type": "string", "enum": ["on", "off"] }
    },
    "required": ["device_id", "action"]
  }
}
```
