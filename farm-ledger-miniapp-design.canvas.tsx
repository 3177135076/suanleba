import { useState, type ReactNode } from "react";
import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Text,
  UsageBar,
  useHostTheme,
} from "cursor/canvas";

type ScreenId = "home" | "expense" | "farm" | "records" | "report" | "detail";

const screens: {
  id: ScreenId;
  name: string;
  description: string;
}[] = [
  {
    id: "home",
    name: "首页 · 经营概览",
    description: "今日概览、快速记录、最近动态",
  },
  {
    id: "expense",
    name: "记一笔花费",
    description: "选类型 → 填金额 → 可选关联农事",
  },
  {
    id: "farm",
    name: "记一件农事",
    description: "选农事类型 → 选地块 → 动态补充",
  },
  {
    id: "records",
    name: "记录 · 事件时间线",
    description: "按日期分组，弱化表格感",
  },
  {
    id: "report",
    name: "报表 · 经营结论",
    description: "三张经营卡，不做复杂仪表盘",
  },
  {
    id: "detail",
    name: "事件详情",
    description: "像事件卡，不像表单回显",
  },
];

const dark = {
  bg: "#141820",
  card: "#1c2230",
  border: "rgba(120, 190, 255, 0.55)",
  accent: "#6ec8ff",
  accentFill: "#6ec8ff",
  text: "#f2f6fb",
  secondary: "#8fa3b8",
  green: "#5dd39e",
  tagBlue: "rgba(110, 200, 255, 0.18)",
  tagGreen: "rgba(93, 211, 158, 0.18)",
  tagYellow: "rgba(244, 201, 93, 0.18)",
};

function PhoneFrame({
  title,
  children,
  tab,
}: {
  title: string;
  children: ReactNode;
  tab?: "home" | "records" | "report";
}) {
  return (
    <div
      style={{
        width: 220,
        borderRadius: 18,
        border: `1px solid ${dark.border}`,
        background: dark.bg,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{ height: 3, background: dark.accent }} />
      <div style={{ padding: "10px 12px 12px" }}>
        <Text size="small" tone="secondary" weight="medium">
          {title}
        </Text>
        <Spacer size={8} />
        {children}
        {tab && (
          <>
            <Spacer size={10} />
            <Row justify="space-around" gap={4}>
              {[
                { key: "home", label: "首页" },
                { key: "records", label: "记录" },
                { key: "report", label: "报表" },
              ].map((t) => (
                <Text
                  key={t.key}
                  size="small"
                  weight={tab === t.key ? "semibold" : "regular"}
                  style={{
                    color: tab === t.key ? dark.accent : dark.secondary,
                    fontSize: 11,
                  }}
                >
                  {t.label}
                </Text>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

function DarkCard({
  children,
  highlight,
  fill,
}: {
  children: ReactNode;
  highlight?: boolean;
  fill?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${dark.border}`,
        background: fill ? dark.accentFill : dark.card,
        padding: "12px 14px",
        borderTop: highlight ? `2px solid ${dark.accent}` : undefined,
        color: fill ? "#0d1a24" : dark.text,
      }}
    >
      {children}
    </div>
  );
}

function Tag({
  label,
  tone = "blue",
}: {
  label: string;
  tone?: "blue" | "green" | "yellow";
}) {
  const bg =
    tone === "green" ? dark.tagGreen : tone === "yellow" ? dark.tagYellow : dark.tagBlue;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 10,
        background: bg,
        color: dark.secondary,
        marginLeft: 6,
      }}
    >
      {label}
    </span>
  );
}

function Chip({
  label,
  active,
  large,
}: {
  label: string;
  active?: boolean;
  large?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: large ? "8px 12px" : "4px 10px",
        borderRadius: 999,
        fontSize: large ? 12 : 11,
        marginRight: 6,
        marginBottom: 6,
        background: active ? "rgba(110, 200, 255, 0.22)" : dark.card,
        color: active ? dark.accent : dark.secondary,
        border: `1px solid ${active ? dark.accent : dark.border}`,
      }}
    >
      {label}
    </span>
  );
}

function TimelineRow({
  time,
  title,
  sub,
  tag,
}: {
  time: string;
  title: string;
  sub?: string;
  tag?: string;
}) {
  return (
    <Row justify="space-between" align="start" gap={8}>
      <div style={{ flex: 1 }}>
        <Text size="small" tone="secondary" style={{ color: dark.secondary, fontSize: 10 }}>
          {time}
        </Text>
        <Text size="small" weight="medium" style={{ color: dark.text }}>
          {title}
        </Text>
        {sub && (
          <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
            {sub}
          </Text>
        )}
      </div>
      {tag && <Tag label={tag} />}
    </Row>
  );
}

function ScreenHome() {
  return (
    <PhoneFrame title="经营首页" tab="home">
      <Row justify="space-between" align="center">
        <div>
          <Text size="small" weight="semibold" style={{ color: dark.text }}>
            今天 · 全部地块
          </Text>
          <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
            本月已记录 12 笔，农事 5 次
          </Text>
        </div>
        <Pill size="sm">看报表</Pill>
      </Row>
      <Spacer size={10} />
      <DarkCard highlight>
        <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
          本月投入
        </Text>
        <Text weight="bold" style={{ fontSize: 26, color: dark.text }}>
          ¥7,660
        </Text>
        <Spacer size={6} />
        <Row justify="space-between">
          <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
            今日支出 ¥860
          </Text>
          <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
            今日农事 打药 1 次
          </Text>
        </Row>
        <Spacer size={4} />
        <Row justify="space-between">
          <Text size="small" style={{ color: dark.green, fontSize: 10 }}>
            肥料 ¥3,200
          </Text>
          <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
            用工 ¥1,200
          </Text>
        </Row>
      </DarkCard>
      <Spacer size={8} />
      <DarkCard fill>
        <Text size="small" weight="semibold">
          记一笔花费
        </Text>
        <Text size="small" style={{ opacity: 0.75, fontSize: 10 }}>
          肥料、农药、用工、农机
        </Text>
      </DarkCard>
      <Spacer size={6} />
      <DarkCard>
        <Text size="small" weight="semibold" style={{ color: dark.text }}>
          记一件农事
        </Text>
        <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
          打药、浇水、施肥、巡田
        </Text>
      </DarkCard>
      <Spacer size={10} />
      <Text size="small" weight="semibold" style={{ color: dark.text }}>
        最近动态
      </Text>
      <Spacer size={6} />
      <Stack gap={8}>
        <TimelineRow time="上午 9:30" title="东片 · 打药" sub="农药 ¥860" tag="成本+农事" />
        <TimelineRow time="昨天" title="西片 · 施肥" sub="肥料 ¥3,200" tag="成本" />
        <TimelineRow time="6月30日" title="全社 · 用工" sub="¥1,200" tag="成本" />
      </Stack>
    </PhoneFrame>
  );
}

function ScreenExpense() {
  return (
    <PhoneFrame title="记一笔花费">
      <Text size="small" weight="semibold" style={{ color: dark.text }}>
        你这笔钱花在哪了？
      </Text>
      <Spacer size={8} />
      <div>
        {["肥料", "农药", "用工", "农机", "种苗", "其他"].map((l, i) => (
          <Chip key={l} label={l} active={i === 1} large />
        ))}
      </div>
      <Spacer size={10} />
      <DarkCard highlight>
        <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
          金额
        </Text>
        <Text weight="bold" style={{ fontSize: 32, color: dark.text }}>
          ¥860
        </Text>
      </DarkCard>
      <Spacer size={8} />
      <Row justify="space-between">
        <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
          地块
        </Text>
        <Chip label="东片" active />
      </Row>
      <Spacer size={4} />
      <Row justify="space-between">
        <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
          关联农事
        </Text>
        <Text size="small" style={{ color: dark.accent, fontSize: 11 }}>
          打药 · 可选
        </Text>
      </Row>
      <Spacer size={12} />
      <div
        style={{
          padding: "9px",
          borderRadius: 10,
          background: dark.accentFill,
          color: "#0d1a24",
          textAlign: "center",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        保存
      </div>
    </PhoneFrame>
  );
}

function ScreenFarm() {
  return (
    <PhoneFrame title="记一件农事">
      <Text size="small" weight="semibold" style={{ color: dark.text }}>
        今天做了什么？
      </Text>
      <Spacer size={8} />
      <div>
        {["打药", "施肥", "浇水", "除草", "采收", "巡田"].map((l, i) => (
          <Chip key={l} label={l} active={i === 0} large />
        ))}
      </div>
      <Spacer size={10} />
      <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
        在哪块地？
      </Text>
      <Spacer size={4} />
      <div>
        <Chip label="东片" active />
        <Chip label="西片" />
        <Chip label="全部" />
      </div>
      <Spacer size={8} />
      <DarkCard>
        <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
          补充 · 打药
        </Text>
        <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
          药剂：除草剂 · 次数：1 次
        </Text>
      </DarkCard>
      <Spacer size={8} />
      <Row justify="space-between" align="center">
        <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
          顺便记成本
        </Text>
        <Text size="small" style={{ color: dark.accent, fontSize: 11 }}>
          添加金额
        </Text>
      </Row>
      <Spacer size={12} />
      <div
        style={{
          padding: "9px",
          borderRadius: 10,
          background: dark.accentFill,
          color: "#0d1a24",
          textAlign: "center",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        保存
      </div>
    </PhoneFrame>
  );
}

function ScreenRecords() {
  return (
    <PhoneFrame title="记录 · 时间线" tab="records">
      <Row gap={6}>
        <Chip label="本月" active />
        <Chip label="全部地块" active />
        <Chip label="全部类型" />
      </Row>
      <Spacer size={6} />
      <div style={{ overflow: "hidden" }}>
        <Chip label="成本" />
        <Chip label="农事" />
        <Chip label="打药" active />
        <Chip label="施肥" />
        <Chip label="用工" />
      </div>
      <Spacer size={10} />
      <Text size="small" weight="semibold" style={{ color: dark.accent }}>
        7月2日 今天
      </Text>
      <Spacer size={6} />
      <Stack gap={6}>
        <DarkCard>
          <Row justify="space-between">
            <Text size="small" style={{ color: dark.text }}>
              东片 · 打药
            </Text>
            <Text size="small" weight="medium" style={{ color: dark.text }}>
              ¥860
            </Text>
          </Row>
        </DarkCard>
        <DarkCard>
          <Text size="small" style={{ color: dark.text }}>
            西片 · 浇水
          </Text>
        </DarkCard>
      </Stack>
      <Spacer size={8} />
      <Text size="small" weight="semibold" style={{ color: dark.secondary }}>
        7月1日
      </Text>
      <Spacer size={6} />
      <DarkCard>
        <Row justify="space-between">
          <Text size="small" style={{ color: dark.text }}>
            西片 · 施肥
          </Text>
          <Text size="small" weight="medium" style={{ color: dark.text }}>
            ¥3,200
          </Text>
        </Row>
      </DarkCard>
    </PhoneFrame>
  );
}

function ScreenReport() {
  return (
    <PhoneFrame title="报表 · 经营结论" tab="report">
      <DarkCard highlight>
        <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
          本月投入
        </Text>
        <Text weight="bold" style={{ fontSize: 24, color: dark.text }}>
          ¥7,660
        </Text>
        <Spacer size={8} />
        <UsageBar
          total={7660}
          topLeftLabel="分类分布"
          segments={[
            { id: "f", value: 3200, color: "blue" },
            { id: "p", value: 860, color: "green" },
            { id: "l", value: 1200, color: "orange" },
            { id: "m", value: 2400, color: "gray" },
          ]}
        />
      </DarkCard>
      <Spacer size={8} />
      <DarkCard>
        <Text size="small" weight="semibold" style={{ color: dark.text }}>
          成本构成
        </Text>
        <Spacer size={6} />
        {[
          ["肥料", "¥3,200", "42%"],
          ["农药", "¥860", "11%"],
          ["用工", "¥1,200", "16%"],
        ].map(([name, amt, pct]) => (
          <div key={name} style={{ marginBottom: 6 }}>
            <Row justify="space-between">
              <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
                {name}
              </Text>
              <Text size="small" style={{ color: dark.secondary, fontSize: 10 }}>
                {amt} {pct}
              </Text>
            </Row>
          </div>
        ))}
      </DarkCard>
      <Spacer size={8} />
      <DarkCard>
        <Text size="small" weight="semibold" style={{ color: dark.text }}>
          地块对比
        </Text>
        <Spacer size={6} />
        {[
          ["东片", 4200],
          ["西片", 2800],
          ["全社", 660],
        ].map(([name, val]) => (
          <div key={name as string} style={{ marginBottom: 6 }}>
            <Row justify="space-between">
              <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
                {name}
              </Text>
              <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
                ¥{val as number}
              </Text>
            </Row>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "rgba(110,200,255,0.15)",
                marginTop: 3,
              }}
            >
              <div
                style={{
                  width: `${((val as number) / 4200) * 100}%`,
                  height: "100%",
                  borderRadius: 2,
                  background: dark.accent,
                }}
              />
            </div>
          </div>
        ))}
      </DarkCard>
      <Spacer size={8} />
      <Row gap={8}>
        <Pill size="sm">导出 CSV</Pill>
        <Pill size="sm">分享长图</Pill>
      </Row>
    </PhoneFrame>
  );
}

function ScreenDetail() {
  return (
    <PhoneFrame title="事件详情">
      <Text weight="bold" style={{ fontSize: 18, color: dark.text }}>
        东片 · 打药
      </Text>
      <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
        7月2日 上午 9:30
      </Text>
      <Spacer size={12} />
      <DarkCard>
        <Text size="small" weight="semibold" style={{ color: dark.accent, fontSize: 11 }}>
          成本
        </Text>
        <Text size="small" style={{ color: dark.text }}>
          农药 ¥860
        </Text>
      </DarkCard>
      <Spacer size={8} />
      <DarkCard>
        <Text size="small" weight="semibold" style={{ color: dark.secondary, fontSize: 11 }}>
          补充
        </Text>
        <Spacer size={4} />
        <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
          药剂：除草剂
        </Text>
        <Text size="small" style={{ color: dark.text, fontSize: 11 }}>
          次数：1 次
        </Text>
        <Text size="small" style={{ color: dark.secondary, fontSize: 11 }}>
          备注：雨后补打
        </Text>
      </DarkCard>
      <Spacer size={12} />
      <Row gap={8}>
        <Pill size="sm">编辑</Pill>
        <Pill size="sm">删除</Pill>
      </Row>
    </PhoneFrame>
  );
}

const screenComponents: Record<ScreenId, () => ReactNode> = {
  home: ScreenHome,
  expense: ScreenExpense,
  farm: ScreenFarm,
  records: ScreenRecords,
  report: ScreenReport,
  detail: ScreenDetail,
};

export default function FarmLedgerMiniappDesign() {
  const theme = useHostTheme();
  const [selected, setSelected] = useState<ScreenId>("home");
  const active = screens.find((s) => s.id === selected)!;
  const ActiveScreen = screenComponents[selected];

  return (
    <Stack gap={16} style={{ padding: 16, maxWidth: 960 }}>
      <Stack gap={4}>
        <H1>农事记账 · 设计路线 1</H1>
        <Text tone="secondary">
          经营首页 + 事件时间线 · 深色卡片风格 · 从「填格子」变成「记今天发生的农场经营事件」
        </Text>
      </Stack>

      <Callout tone="info" title="设计目标">
        <Text size="small">
          保留深色底、浅蓝描边、高对比文字和卡片式信息层级。首页只回答三个问题：今天做了什么、本月花了多少、还有什么需要补记。
        </Text>
      </Callout>

      <Grid columns={3} gap={10}>
        {screens.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              cursor: "pointer",
              outline: selected === s.id ? `2px solid ${theme.accent.primary}` : undefined,
              borderRadius: 8,
            }}
          >
            <Card variant={selected === s.id ? "default" : "borderless"}>
              <CardHeader>{s.name}</CardHeader>
              <CardBody>
                <Text size="small" tone="secondary">
                  {s.description}
                </Text>
              </CardBody>
            </Card>
          </div>
        ))}
      </Grid>

      <Divider />

      <H2>{active.name}</H2>
      <Row gap={16} align="start" wrap style={{ flexWrap: "wrap" }}>
        <ActiveScreen />
      </Row>

      <Divider />

      <H3>信息架构</H3>
      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader>首页</CardHeader>
          <CardBody>
            <Text size="small">今日概览 · 快速记录 · 最近动态</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>记录</CardHeader>
          <CardBody>
            <Text size="small">时间线 · 筛选 · 详情</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>报表</CardHeader>
          <CardBody>
            <Text size="small">本月投入 · 成本构成 · 地块对比</Text>
          </CardBody>
        </Card>
      </Grid>

      <H3>与旧方案 A/B/C 的取舍</H3>
      <Grid columns={3} gap={12}>
        {[
          ["方案 A", "不用首页宫格，仍像分类面板"],
          ["方案 B", "不用成本/农事双 Tab，会把同一件事拆开"],
          ["方案 C", "不用三步入口，每次像被引导填流程"],
        ].map(([name, reason]) => (
          <Card key={name}>
            <CardHeader>{name}</CardHeader>
            <CardBody>
              <Text size="small" tone="secondary">
                {reason}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Row gap={8} wrap>
        {screens.map((s) => (
          <Button
            key={s.id}
            variant={selected === s.id ? "primary" : "secondary"}
            onClick={() => setSelected(s.id)}
          >
            {s.name.split(" · ")[0]}
          </Button>
        ))}
      </Row>
    </Stack>
  );
}
