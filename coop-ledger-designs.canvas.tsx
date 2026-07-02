import { useState, type ReactNode } from "react";
import {
  BarChart,
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
  Stat,
  Table,
  Text,
  UsageBar,
  useHostTheme,
} from "cursor/canvas";

type SchemeId = "A" | "B" | "C";

const schemes: {
  id: SchemeId;
  name: string;
  tagline: string;
  bestFor: string;
  recordFlow: string;
  logFilter: string;
  report: string;
}[] = [
  {
    id: "A",
    name: "方案 A · 一屏记账",
    tagline: "首页即操作，文字最少",
    bestFor: "只想快速记钱、少看字",
    recordFlow: "6 宫格点类型 → 只填金额 → 完成",
    logFilter: "顶部筛选：月份 | 类型 | 地块，点选即筛",
    report: "顶栏「报表」→ 汇总 + 占比条 + 导出 CSV",
  },
  {
    id: "B",
    name: "方案 B · 成本 / 农事分开",
    tagline: "账目与日志分 Tab，结构最清晰",
    bestFor: "既要钱也要打药次数、灌溉记录",
    recordFlow: "「成本」记金额；「农事」记次数，金额可填 0",
    logFilter: "农事 Tab 多选 Chip：今天 / 打药 / 灌溉 / 地块",
    report: "独立报表页：按类 / 按地块 / 按月 + 出表",
  },
  {
    id: "C",
    name: "方案 C · 三步向导",
    tagline: "每屏一件事，几乎不用打字",
    bestFor: "字段多但不想表单吓人",
    recordFlow: "① 选类型 ② 选地块 ③ 点模板 + 填金额",
    logFilter: "左侧类型栏 + 右侧列表，地块横向滑动",
    report: "「看报表」入口：总览 + 明细表 + 长图分享",
  },
];

function PhoneFrame({
  title,
  children,
  accent,
}: {
  title: string;
  children: ReactNode;
  accent: string;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        width: 210,
        borderRadius: 16,
        border: `1px solid ${theme.stroke.primary}`,
        background: theme.bg.editor,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{ height: 4, background: accent }} />
      <div style={{ padding: "10px 12px 14px" }}>
        <Text size="small" tone="secondary" weight="medium">
          {title}
        </Text>
        <Spacer size={8} />
        {children}
      </div>
    </div>
  );
}

function MockChip({ label, active }: { label: string; active?: boolean }) {
  const theme = useHostTheme();
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        borderRadius: 999,
        fontSize: 11,
        marginRight: 6,
        marginBottom: 4,
        background: active ? theme.fill.secondary : theme.bg.chrome,
        color: active ? theme.accent.primary : theme.text.secondary,
        border: `1px solid ${active ? theme.accent.primary : theme.stroke.secondary}`,
      }}
    >
      {label}
    </span>
  );
}

function MockGridBtn({ label }: { label: string }) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        padding: "9px 4px",
        textAlign: "center",
        borderRadius: 8,
        background: theme.bg.chrome,
        border: `1px solid ${theme.stroke.secondary}`,
        fontSize: 11,
        color: theme.text.primary,
      }}
    >
      {label}
    </div>
  );
}

function SchemeA({ accent }: { accent: string }) {
  const theme = useHostTheme();
  return (
    <PhoneFrame title="方案 A · 记账首页" accent={accent}>
      <Row gap={8} align="center" justify="space-between">
        <Text size="small" weight="semibold">
          5月
        </Text>
        <Pill size="sm" active>
          报表
        </Pill>
      </Row>
      <Spacer size={6} />
      <Text weight="bold" style={{ fontSize: 20, color: theme.accent.primary }}>
        ¥ 7,660
      </Text>
      <Text size="small" tone="secondary">
        12 笔 · 本月投入
      </Text>
      <Spacer size={10} />
      <Grid columns={3} gap={6}>
        {["施肥", "打药", "灌溉", "用工", "农机", "其他"].map((l) => (
          <div key={l}>
            <MockGridBtn label={l} />
          </div>
        ))}
      </Grid>
      <Spacer size={10} />
      <div>
        <MockChip label="全部" active />
        <MockChip label="东片" />
        <MockChip label="西片" />
      </div>
      <Spacer size={8} />
      <Stack gap={4}>
        {[
          ["底肥", "¥3,200"],
          ["除草", "¥860"],
          ["间苗", "¥1,200"],
        ].map(([a, b]) => (
          <div key={a}>
            <Row justify="space-between" align="center">
              <Text size="small">{a}</Text>
              <Text size="small" weight="medium">
                {b}
              </Text>
            </Row>
          </div>
        ))}
      </Stack>
      <Spacer size={10} />
      <div
        style={{
          padding: "8px",
          borderRadius: 8,
          background: accent,
          color: theme.text.onAccent,
          textAlign: "center",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        记一笔
      </div>
    </PhoneFrame>
  );
}

function SchemeB({ accent }: { accent: string }) {
  return (
    <Stack gap={10}>
      <PhoneFrame title="Tab · 成本" accent={accent}>
        <Row gap={6}>
          <MockChip label="成本" active />
          <MockChip label="农事" />
        </Row>
        <Spacer size={8} />
        <UsageBar
          total={7660}
          topLeftLabel="本月分类占比"
          segments={[
            { id: "f", value: 3200, color: "green" },
            { id: "p", value: 860, color: "blue" },
            { id: "l", value: 1200, color: "orange" },
            { id: "m", value: 2400, color: "gray" },
          ]}
        />
        <Spacer size={8} />
        <Text weight="bold" style={{ fontSize: 18 }}>
          ¥ 7,660
        </Text>
        <Spacer size={6} />
        <Text size="small">施肥 3200 · 打药 860 · 用工 1200</Text>
      </PhoneFrame>
      <PhoneFrame title="Tab · 农事日志" accent={accent}>
        <Row gap={6}>
          <MockChip label="成本" />
          <MockChip label="农事" active />
        </Row>
        <Spacer size={8} />
        <div>
          <MockChip label="今天" />
          <MockChip label="打药" active />
          <MockChip label="灌溉" />
          <MockChip label="东片" active />
        </div>
        <Spacer size={8} />
        <Text size="small">5/12 除草 · 1次</Text>
        <Text size="small">5/10 春灌 · 2次</Text>
        <Spacer size={6} />
        <Text size="small" tone="tertiary">
          金额可填 0，只记次数
        </Text>
      </PhoneFrame>
      <PhoneFrame title="报表页" accent={accent}>
        <div>
          <MockChip label="按类" active />
          <MockChip label="按地块" />
          <MockChip label="按月" />
        </div>
        <Spacer size={8} />
        <BarChart
          height={90}
          categories={["施肥", "打药", "用工", "农机"]}
          series={[{ name: "金额", data: [3200, 860, 1200, 2400] }]}
          valuePrefix="¥"
        />
        <Spacer size={6} />
        <Row gap={8}>
          <Pill size="sm">导出</Pill>
          <Pill size="sm">复制</Pill>
        </Row>
      </PhoneFrame>
    </Stack>
  );
}

function SchemeC({ accent }: { accent: string }) {
  return (
    <Stack gap={10}>
      <PhoneFrame title="首页 · 3 入口" accent={accent}>
        <Stack gap={8}>
          {[
            ["记投入", "类型 + 金额"],
            ["记农事", "次数 / 用量"],
            ["看报表", "汇总 + 出表"],
          ].map(([t, s]) => (
            <div
              key={t}
              style={{
                padding: "10px",
                borderRadius: 10,
                border: `1px solid ${accent}`,
              }}
            >
              <Text size="small" weight="semibold">
                {t}
              </Text>
              <Text size="small" tone="secondary">
                {s}
              </Text>
            </div>
          ))}
        </Stack>
      </PhoneFrame>
      <PhoneFrame title="记投入 · 步骤 2/3" accent={accent}>
        <Text size="small" tone="secondary">
          选地块
        </Text>
        <Spacer size={6} />
        <MockChip label="东片" active />
        <MockChip label="西片" />
        <MockChip label="全社" />
        <Spacer size={8} />
        <Text size="small" tone="secondary">
          常用事项（点选）
        </Text>
        <Spacer size={6} />
        <Grid columns={2} gap={6}>
          {["底肥", "追肥", "除草", "其他"].map((l) => (
            <div key={l}>
              <MockGridBtn label={l} />
            </div>
          ))}
        </Grid>
      </PhoneFrame>
      <PhoneFrame title="报表 · 分享" accent={accent}>
        <Stat value="¥7,660" label="5月总投入" tone="success" />
        <Spacer size={8} />
        <Table
          headers={["分类", "金额"]}
          rows={[
            ["施肥", "3,200"],
            ["农机", "2,400"],
            ["用工", "1,200"],
          ]}
          columnAlign={["left", "right"]}
        />
        <Spacer size={8} />
        <Row gap={8}>
          <Pill size="sm" active>
            导出表格
          </Pill>
          <Pill size="sm">生成长图</Pill>
        </Row>
      </PhoneFrame>
    </Stack>
  );
}

export default function CoopLedgerDesigns() {
  const theme = useHostTheme();
  const accent = theme.accent.primary;
  const [selected, setSelected] = useState<SchemeId>("B");
  const active = schemes.find((s) => s.id === selected)!;

  return (
    <Stack gap={16} style={{ padding: 16, maxWidth: 920 }}>
      <Stack gap={4}>
        <H1>农事记账 · 三版方案</H1>
        <Text tone="secondary">
          黑土卫士绿色风格 · 少文字点选 · 分类清晰 · 报表随时出表。点击方案卡片切换示意。
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        {schemes.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              cursor: "pointer",
              outline: selected === s.id ? `2px solid ${accent}` : undefined,
              borderRadius: 8,
            }}
          >
            <Card variant={selected === s.id ? "default" : "borderless"}>
              <CardHeader trailing={<Pill size="sm">{s.id}</Pill>}>{s.name}</CardHeader>
              <CardBody>
                <Text size="small" weight="semibold">
                  {s.tagline}
                </Text>
                <Spacer size={6} />
                <Text size="small" tone="secondary">
                  适合：{s.bestFor}
                </Text>
              </CardBody>
            </Card>
          </div>
        ))}
      </Grid>

      <Callout tone="info" title={`当前：${active.name}`}>
        <Stack gap={4}>
          <Text size="small">
            <Text weight="semibold">记一笔：</Text>
            {active.recordFlow}
          </Text>
          <Text size="small">
            <Text weight="semibold">日志筛选：</Text>
            {active.logFilter}
          </Text>
          <Text size="small">
            <Text weight="semibold">报表：</Text>
            {active.report}
          </Text>
        </Stack>
      </Callout>

      <Divider />

      <H2>界面示意</H2>
      <Row gap={16} align="start" wrap style={{ flexWrap: "wrap" }}>
        {selected === "A" && <SchemeA accent={accent} />}
        {selected === "B" && <SchemeB accent={accent} />}
        {selected === "C" && <SchemeC accent={accent} />}
      </Row>

      <Divider />

      <H3>共用字段（三版底层一致）</H3>
      <Table
        headers={["字段", "必填", "录入方式"]}
        rows={[
          ["类型", "是", "宫格 / Chip"],
          ["金额", "成本必填", "数字键盘"],
          ["地块", "否", "Chip 点选"],
          ["事项", "是", "模板按钮"],
          ["次数/用量", "农事建议", "± 或模板"],
          ["日期", "默认今天", "可选改"],
        ]}
      />

      <H3>报表出表（三版都有）</H3>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>汇总</CardHeader>
          <CardBody>
            <Text size="small">本月总额 · 分类占比 · 地块小计</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>导出</CardHeader>
          <CardBody>
            <Text size="small">CSV · 复制微信 · 长图（C 版强调）</Text>
          </CardBody>
        </Card>
      </Grid>

      <Row gap={8}>
        <Button variant={selected === "A" ? "primary" : "secondary"} onClick={() => setSelected("A")}>
          选 A
        </Button>
        <Button variant={selected === "B" ? "primary" : "secondary"} onClick={() => setSelected("B")}>
          选 B
        </Button>
        <Button variant={selected === "C" ? "primary" : "secondary"} onClick={() => setSelected("C")}>
          选 C
        </Button>
      </Row>
    </Stack>
  );
}
