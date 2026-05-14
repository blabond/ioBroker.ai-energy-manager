import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { DialogSelectID, I18n } from "@iobroker/adapter-react-v5";
import { dictionary } from "@iobroker/adapter-react-v5/build/dictionary";
import translationsDe from "../admin/i18n/de/translations.json";
import translationsEn from "../admin/i18n/en/translations.json";
import translationsEs from "../admin/i18n/es/translations.json";
import translationsFr from "../admin/i18n/fr/translations.json";
import translationsIt from "../admin/i18n/it/translations.json";
import translationsNl from "../admin/i18n/nl/translations.json";
import translationsPl from "../admin/i18n/pl/translations.json";
import translationsPt from "../admin/i18n/pt/translations.json";
import translationsRu from "../admin/i18n/ru/translations.json";
import translationsUk from "../admin/i18n/uk/translations.json";
import translationsZhCn from "../admin/i18n/zh-cn/translations.json";
import "./style.css";

const ADMIN_REQUEST_TIMEOUT_MS = 20000;
const PLAN_LEGEND_MODES = [
  ["grid_operation", "gridOperation"],
  ["pv_battery_operation", "pvBatteryOperation"],
  ["insufficient_data", "insufficientData"],
];

const TOOLTIP_CLOSE_DELAY_MS = 5000;
const SUPPORTED_LANGUAGES = new Set([
  "de",
  "en",
  "es",
  "fr",
  "it",
  "nl",
  "pl",
  "pt",
  "ru",
  "uk",
  "zh-cn",
]);
const ADAPTER_TRANSLATIONS = {
  de: translationsDe,
  en: translationsEn,
  es: translationsEs,
  fr: translationsFr,
  it: translationsIt,
  nl: translationsNl,
  pl: translationsPl,
  pt: translationsPt,
  ru: translationsRu,
  uk: translationsUk,
  "zh-cn": translationsZhCn,
};

I18n.setTranslations(dictionary);
applyAdapterTranslations();
I18n.setLanguage(resolveLanguage(window.sysLang || window.systemLang || "en"));

function t(key, ...args) {
  return I18n.t(key, ...args);
}

function resolveLanguage(language) {
  const normalized = String(language || "")
    .trim()
    .toLowerCase();
  if (!normalized) {
    return "en";
  }
  if (normalized.startsWith("zh")) {
    return "zh-cn";
  }
  const shortLanguage = normalized.slice(0, 2);
  return SUPPORTED_LANGUAGES.has(normalized)
    ? normalized
    : SUPPORTED_LANGUAGES.has(shortLanguage)
      ? shortLanguage
      : "en";
}

function applyAdapterTranslations() {
  I18n.extendTranslations(ADAPTER_TRANSLATIONS);
}

function useAdminLanguage(adminSocket, adminLanguage) {
  const [activeLanguage, setActiveLanguage] = useState(() =>
    resolveLanguage(
      adminLanguage ||
        adminSocket?.systemLang ||
        window.sysLang ||
        window.systemLang ||
        I18n.getLanguage(),
    ),
  );

  useEffect(() => {
    let active = true;
    const immediateLanguage = resolveLanguage(
      adminLanguage ||
        adminSocket?.systemLang ||
        window.sysLang ||
        window.systemLang ||
        I18n.getLanguage(),
    );
    setActiveLanguage(immediateLanguage);

    if (adminSocket?.getObject) {
      adminSocket
        .getObject("system.config")
        .then((systemConfig) => {
          if (!active) {
            return;
          }
          setActiveLanguage(
            resolveLanguage(
              systemConfig?.common?.language ||
                adminSocket?.systemLang ||
                immediateLanguage,
            ),
          );
        })
        .catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [adminLanguage, adminSocket]);

  applyAdapterTranslations();
  I18n.setLanguage(activeLanguage);
  return activeLanguage;
}

const EMPTY_SETTINGS = {
  adapterToken: "",
  serverConfigLastRequest: "",
  datapointAssignments: [],
  dashboardLite: null,
};

let latestSettings = { ...EMPTY_SETTINGS };
let externalChangeHandler = () => {};
let applySettingsToApp = null;
let latestDashboardLite = null;
let latestDashboardLiteLastRequest = "";

function clone(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function notifyChanged() {
  externalChangeHandler();
}

function toSaveableSettings(settings) {
  const saveableSettings = clone(settings) || {};
  delete saveableSettings.dashboardLite;
  delete saveableSettings.dashboardLiteLastRequest;
  return saveableSettings;
}

function saveSettings(callback) {
  callback(toSaveableSettings(latestSettings));
}

if (window.aemStandaloneConfig) {
  window.load = (settings, onChange) => {
    const incoming = clone(settings) || {};
    latestSettings = {
      ...EMPTY_SETTINGS,
      ...incoming,
      dashboardLite: incoming.dashboardLite || latestDashboardLite,
      dashboardLiteLastRequest:
        incoming.dashboardLiteLastRequest || latestDashboardLiteLastRequest,
    };
    externalChangeHandler =
      typeof onChange === "function" ? onChange : () => {};
    applySettingsToApp?.(latestSettings);
    externalChangeHandler(false);
  };

  window.save = saveSettings;
}

function App({
  adminSocket = null,
  adminTheme = null,
  adminThemeType = "",
  adminLanguage = "",
  adapterName = "ai-energy-manager",
  configData = null,
  instance = 0,
  onConfigChange = null,
} = {}) {
  useAdminLanguage(adminSocket, adminLanguage);
  const embedded = typeof onConfigChange === "function";
  const [settings, setSettings] = useState(() => ({
    ...EMPTY_SETTINGS,
    ...(clone(configData) || latestSettings),
  }));
  const [tab, setTab] = useState(0);
  const [requestStatus, setRequestStatus] = useState("");
  const [dashboardStatus, setDashboardStatus] = useState("");
  const [busyConfig, setBusyConfig] = useState(false);
  const [selectStateIndex, setSelectStateIndex] = useState(null);
  const observedThemeType = useObservedThemeType();
  const settingsRef = useRef(settings);

  applySettingsToApp = (nextSettings) => {
    if (!embedded) {
      setSettings({ ...nextSettings });
    }
  };

  const themeType =
    observedThemeType ||
    adminThemeType ||
    adminTheme?.palette?.mode ||
    detectThemeType({ fallbackToSystem: true });
  const inheritedTheme =
    adminTheme?.palette?.mode === themeType ? adminTheme : null;
  const theme = useMemo(
    () =>
      inheritedTheme ||
      createTheme({
        palette: {
          mode: themeType,
          primary: { main: "#1976d2" },
          secondary: { main: "#2e7d32" },
          background:
            themeType === "dark"
              ? { default: "#101418", paper: "#171d22" }
              : { default: "#f5f7fa", paper: "#ffffff" },
        },
        shape: { borderRadius: 6 },
      }),
    [inheritedTheme, themeType],
  );

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    if (!embedded) {
      return;
    }
    const nextSettings = {
      ...EMPTY_SETTINGS,
      ...(clone(configData) || {}),
      dashboardLite: settingsRef.current.dashboardLite || latestDashboardLite,
      dashboardLiteLastRequest:
        settingsRef.current.dashboardLiteLastRequest ||
        latestDashboardLiteLastRequest,
    };
    latestSettings = nextSettings;
    settingsRef.current = nextSettings;
    setSettings(nextSettings);
  }, [configData, embedded]);

  function updateSettings(updater, changed = true) {
    const next =
      typeof updater === "function"
        ? updater(clone(settingsRef.current))
        : updater;
    latestSettings = { ...EMPTY_SETTINGS, ...(next || {}) };
    settingsRef.current = latestSettings;
    setSettings(latestSettings);
    if (changed) {
      if (embedded) {
        onConfigChange(toSaveableSettings(latestSettings));
      } else {
        notifyChanged();
      }
    }
  }

  function setField(name, value) {
    updateSettings((draft) => ({ ...draft, [name]: value }));
  }

  function sendToAdapter(command, message, callback) {
    if (adminSocket?.sendTo) {
      adminSocket
        .sendTo(`${adapterName}.${instance}`, command, message)
        .then((result) => callback(result))
        .catch((error) =>
          callback({ ok: false, errors: [error?.message || String(error)] }),
        );
      return;
    }
    if (window.sendTo) {
      window.sendTo(null, command, message, callback);
      return;
    }
    callback({
      ok: false,
      errors: [t("adminConnectionUnavailable")],
    });
  }

  function requestConfig() {
    const token = String(settings.adapterToken || "").trim();
    if (!token) {
      return;
    }
    let finished = false;
    const timeout = window.setTimeout(() => {
      if (finished) {
        return;
      }
      finished = true;
      setBusyConfig(false);
      setRequestStatus(t("adapterNoResponse"));
    }, ADMIN_REQUEST_TIMEOUT_MS);
    setBusyConfig(true);
    setRequestStatus(t("configLoading"));
    sendToAdapter(
      "requestConfig",
      { source: "admin", adapterToken: token },
      (result) => {
        if (finished) {
          return;
        }
        finished = true;
        window.clearTimeout(timeout);
        setBusyConfig(false);
        if (!result || result.ok === false) {
          setRequestStatus(formatErrors(result));
          return;
        }
        updateSettings((draft) => ({
          ...draft,
          serverConfig: result.serverConfig || draft.serverConfig,
          serverConfigLastRequest: result.serverConfigLastRequest || "",
          datapointAssignments:
            result.datapointAssignments || draft.datapointAssignments || [],
        }));
        setRequestStatus(t("configLoaded"));
      },
    );
  }

  function applyServerConfigState(result) {
    if (!result || result.ok === false || !result.serverConfig) {
      return;
    }
    const nextLastRequest = String(result.serverConfigLastRequest || "");
    updateSettings(
      (draft) => ({
        ...draft,
        serverConfig: result.serverConfig,
        serverConfigLastRequest: nextLastRequest,
        datapointAssignments:
          result.datapointAssignments || draft.datapointAssignments || [],
      }),
      false,
    );
  }

  useEffect(() => {
    if (!adminSocket?.sendTo && !window.sendTo) {
      return undefined;
    }
    let active = true;
    function readServerConfigState() {
      sendToAdapter("readServerConfigState", {}, (result) => {
        if (!active) {
          return;
        }
        applyServerConfigState(result);
      });
    }
    function readDashboardLiteState(refresh = false) {
      sendToAdapter("readDashboardLiteState", { refresh }, (result) => {
        if (!active) {
          return;
        }
        if (!result || result.ok === false) {
          setDashboardStatus(formatErrors(result));
          return;
        }
        if (result.dashboardLite) {
          latestDashboardLite = result.dashboardLite;
          latestDashboardLiteLastRequest =
            result.dashboardLiteLastRequest || "";
        }
        updateSettings(
          (draft) => ({
            ...draft,
            dashboardLite: result.dashboardLite || draft.dashboardLite || null,
            dashboardLiteLastRequest:
              result.dashboardLiteLastRequest ||
              draft.dashboardLiteLastRequest ||
              "",
          }),
          false,
        );
        setDashboardStatus(
          result.dashboardLiteLastRequest
            ? t("autoUpdated", formatDateTime(result.dashboardLiteLastRequest))
            : t("waitingForDashboardData"),
        );
      });
    }
    readServerConfigState();
    readDashboardLiteState(true);
    const dashboardInterval = window.setInterval(
      () => readDashboardLiteState(false),
      15000,
    );
    return () => {
      active = false;
      window.clearInterval(dashboardInterval);
    };
  }, []);

  function updateAssignment(index, patch) {
    updateSettings((draft) => {
      const assignments = Array.isArray(draft.datapointAssignments)
        ? [...draft.datapointAssignments]
        : [];
      assignments[index] = { ...(assignments[index] || {}), ...patch };
      return { ...draft, datapointAssignments: assignments };
    });
  }

  async function selectStatePath(index) {
    const current = settings.datapointAssignments?.[index]?.stateId || "";
    if (adminSocket?.sendTo) {
      setSelectStateIndex(index);
      return;
    }
    try {
      const selected = await window.aemSelectStatePath?.(current);
      if (selected) {
        updateAssignment(index, { stateId: selected });
      }
    } catch (error) {
      setRequestStatus(error?.message || t("objectSelectionUnavailable"));
    }
  }

  const hasToken = String(settings.adapterToken || "").trim().length > 0;
  const hasValidToken = hasToken && settings.serverConfig?.valid === true;
  const hasRequiredSettings = requiredSettingsComplete(
    settings.datapointAssignments || [],
  );

  return (
    <ThemeProvider theme={theme}>
      <Box className={`aem-root${embedded ? " aem-root-embedded" : ""}`}>
        <Paper className="aem-shell" elevation={0}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              gap={1}
            >
              <Box>
                <Typography variant="h6" component="h1">
                  AI Energy Manager
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("noAccountOrToken")}{" "}
                  <a
                    href="https://smartenergy.mr-bond.de"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("openSmartEnergyPortal")}
                  </a>
                </Typography>
              </Box>
            </Stack>

            <Tabs value={tab} onChange={(_, value) => setTab(value)}>
              <Tab
                icon={<DashboardIcon />}
                iconPosition="start"
                label={t("dashboard")}
              />
              <Tab
                icon={<SettingsIcon />}
                iconPosition="start"
                label={t("settings")}
              />
            </Tabs>

            {tab === 0 ? (
              <DashboardTab
                dashboardStatus={dashboardStatus}
                hasRequiredSettings={hasRequiredSettings}
                hasValidToken={hasValidToken}
                settings={settings}
              />
            ) : (
              <SettingsTab
                assignments={settings.datapointAssignments || []}
                busyConfig={busyConfig}
                hasToken={hasToken}
                requestConfig={requestConfig}
                requestStatus={requestStatus}
                selectStatePath={selectStatePath}
                settings={settings}
                setField={setField}
                updateAssignment={updateAssignment}
              />
            )}
          </Stack>
        </Paper>
      </Box>
      {adminSocket?.sendTo && selectStateIndex !== null ? (
        <DialogSelectID
          columns={["name", "type", "role", "val"]}
          onClose={() => setSelectStateIndex(null)}
          onOk={(selected) => {
            if (typeof selected === "string" && selected) {
              updateAssignment(selectStateIndex, { stateId: selected });
            }
            setSelectStateIndex(null);
          }}
          selected={
            settings.datapointAssignments?.[selectStateIndex]?.stateId || ""
          }
          socket={adminSocket}
          theme={theme}
          themeType={themeType}
          title={t("selectStatePathTitle")}
          types="state"
        />
      ) : null}
    </ThemeProvider>
  );
}

function DashboardTab({
  dashboardStatus,
  hasRequiredSettings,
  hasValidToken,
  settings,
}) {
  if (!hasValidToken) {
    return <Alert severity="warning">{t("settingsTokenMissing")}</Alert>;
  }
  if (!hasRequiredSettings) {
    return <Alert severity="warning">{t("dashboardRequiredMissing")}</Alert>;
  }
  return (
    <Stack spacing={2}>
      {dashboardStatus && isErrorStatus(dashboardStatus) ? (
        <Alert severity="error">{dashboardStatus}</Alert>
      ) : null}
      <DashboardLite
        dashboard={settings.dashboardLite}
        lastRequest={settings.dashboardLiteLastRequest}
      />
    </Stack>
  );
}

function SettingsTab({
  assignments,
  busyConfig,
  hasToken,
  requestConfig,
  requestStatus,
  selectStatePath,
  settings,
  setField,
  updateAssignment,
}) {
  return (
    <Stack spacing={2}>
      <Section title={t("connection")}>
        <Box className="settings-field-grid">
          <TextField
            label={t("adapterToken")}
            type="password"
            value={settings.adapterToken || ""}
            onChange={(event) => setField("adapterToken", event.target.value)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            label={t("lastConfigRequest")}
            value={formatDateTime(settings.serverConfigLastRequest)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            disabled={!hasToken || busyConfig}
            startIcon={<RefreshIcon />}
            onClick={requestConfig}
          >
            Request Config
          </Button>
        </Stack>
        {requestStatus ? (
          <Alert severity={isErrorStatus(requestStatus) ? "error" : "info"}>
            {requestStatus}
          </Alert>
        ) : null}
      </Section>
      <DatapointsTab
        assignments={assignments}
        selectStatePath={selectStatePath}
        updateAssignment={updateAssignment}
      />
      <Alert severity="info">{t("acDcInfo")}</Alert>
    </Stack>
  );
}

function DashboardLite({ dashboard, lastRequest }) {
  if (!dashboard) {
    return <EmptyState text={t("noDashboardData")} />;
  }
  const dataTimestamp = dashboard.decisionTime || lastRequest || "";
  return (
    <Stack spacing={2}>
      <Section
        title="Dashboard"
        titleAction={
          dataTimestamp ? (
            <Typography variant="caption" color="text.secondary">
              {t("dashboardDataAsOf", formatDateTimeMinute(dataTimestamp))}
            </Typography>
          ) : null
        }
      >
        <Box className="card-grid">
          {(dashboard.cards || []).map((card, index) => (
            <Paper
              className="metric-card"
              key={`${card.label || "card"}-${index}`}
            >
              <Typography variant="h6">
                {formatDashboardCardValue(card)}
                {card.unit ? <span> {card.unit}</span> : null}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {translateDashboardText(card.label || "")}
              </Typography>
            </Paper>
          ))}
        </Box>
        {dashboard.reason ? (
          <Typography variant="body2" color="text.secondary">
            {translateDashboardText(dashboard.reason)}
          </Typography>
        ) : null}
      </Section>
      <Section title={t("sixHourPlan")}>
        <PlanTimeline plan={dashboard.plan || []} />
      </Section>
      <Section title={t("patternDetection")}>
        <PatternOverview pattern={dashboard.pattern || {}} />
      </Section>
    </Stack>
  );
}

function Section({ children, title, titleAction = null }) {
  return (
    <Paper className="section" elevation={0}>
      <Box className="section-title-row">
        <Typography variant="subtitle1" component="h2">
          {title}
        </Typography>
        {titleAction ? <Box className="section-title-action">{titleAction}</Box> : null}
      </Box>
      {children}
    </Paper>
  );
}

function PlanTimeline({ plan }) {
  if (!plan.length) {
    return <EmptyState text={t("noSixHourPlan")} />;
  }
  const slots = plan.slice(0, 6);
  return (
    <Stack spacing={1.5}>
      <Box className="plan-timeline" aria-label="6-Stunden-Plan">
        {slots.map((slot, index) => (
          <Tooltip
            key={`${slot.from || index}-${slot.action || "none"}`}
            title={`${formatTimeRange(slot.from, slot.to)} · ${translateDashboardText(
              slot.operatingModeLabel || slot.actionLabel || "-",
            )} · ${translateDashboardText(slot.batteryCommand || "-")} · ${translateDashboardText(
              slot.gridBehavior || "-",
            )} · ${formatNumber(slot.plannedPowerW, 0)} W · ${formatNumber(
              slot.plannedEnergyKwh,
              2,
            )} kWh${
              slot.technicalActionLabel
                ? ` · ${t(
                    "technicalAction",
                    translateDashboardText(slot.technicalActionLabel),
                  )}`
                : ""
            }${slot.reason ? ` · ${translateDashboardText(slot.reason)}` : ""}`}
          >
            <Box
              className={`plan-slot mode-border-${modeClass(slot)}`}
              tabIndex={0}
            >
              <Typography variant="caption" color="text.secondary">
                {formatTimeRange(slot.from, slot.to)}
              </Typography>
              <Typography variant="body2" className="plan-slot-action" noWrap>
                {translateDashboardText(
                  slot.operatingModeLabel || slot.actionLabel || "-",
                )}
              </Typography>
              <Typography
                variant="caption"
                className="plan-slot-command"
                noWrap
              >
                {translateDashboardText(slot.batteryCommand || "-")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatNumber(slot.plannedPowerW, 0)} W{" · "}
                {formatNumber(slot.plannedEnergyKwh, 2)} kWh
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
      <Box className="plan-legend">
        {PLAN_LEGEND_MODES.map(([mode, labelKey]) => (
          <span key={mode}>
            <i className={`mode-${mode}`} />
            {t(labelKey)}
          </span>
        ))}
      </Box>
    </Stack>
  );
}

function PatternOverview({ pattern }) {
  return (
    <Stack spacing={2}>
      <Box className="card-grid pattern-grid">
        <Metric
          label={t("activeLoadProfile")}
          value={translateDashboardText(pattern.activeLabel || "-")}
        />
        <Metric
          label={t("profileForecast")}
          value={`${formatNullable(pattern.activeEstimateKwh, 2)} kWh`}
        />
        <Metric
          label={t("baseLoadProfile")}
          value={formatBaseLoadProfile(pattern.baseLoadW)}
        />
        <Metric
          label={t("todayProjected")}
          value={`${formatNullable(pattern.todayProjectedKwh, 2)} kWh`}
        />
      </Box>
      {pattern.reason ? (
        <Typography variant="body2" color="text.secondary">
          {translateDashboardText(pattern.reason)}
        </Typography>
      ) : null}
      {Array.isArray(pattern.profiles) && pattern.profiles.length ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("profile")}</TableCell>
                <TableCell>{t("averageConsumption")}</TableCell>
                <TableCell>{t("range")}</TableCell>
                <TableCell>{t("confidence")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pattern.profiles.map((profile) => (
                <TableRow key={profile.label || profile.id}>
                  <TableCell>
                    {translateDashboardText(profile.label || "-")}
                  </TableCell>
                  <TableCell>
                    {formatNullable(profile.averageKwh, 2)} kWh
                  </TableCell>
                  <TableCell>
                    {formatNullable(profile.minKwh, 2)} -{" "}
                    {formatNullable(profile.maxKwh, 2)} kWh
                  </TableCell>
                  <TableCell>{formatNullable(profile.confidence, 2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
}

function Metric({ label, value }) {
  return (
    <Paper className="metric-card" elevation={0}>
      <Typography variant="h6">{value}</Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}

function DatapointsTab({ assignments, selectStatePath, updateAssignment }) {
  if (!assignments.length) {
    return <EmptyState text={t("noDatapointAssignments")} />;
  }
  return (
    <Stack spacing={2}>
      {groupAssignments(assignments).map((group) => (
        <Paper className="section group-card" elevation={0} key={group.key}>
          <Stack spacing={1}>
            <Box className="group-title-row">
              <Typography variant="subtitle1" component="h2" noWrap>
                {group.title}
              </Typography>
              {group.subtitle ? (
                <Chip size="small" label={group.subtitle} />
              ) : null}
            </Box>
            <Divider />
            <TableContainer>
              <Table size="small" className="datapoint-table">
                <colgroup>
                  <col className="datapoint-col-label" />
                  <col className="datapoint-col-type" />
                  <col className="datapoint-col-unit" />
                  <col className="datapoint-col-power-type" />
                  <col className="datapoint-col-state" />
                  <col className="datapoint-col-required" />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("value")}</TableCell>
                    <TableCell>{t("type")}</TableCell>
                    <TableCell>{t("unit")}</TableCell>
                    <TableCell>AC/DC</TableCell>
                    <TableCell>ioBroker State-Path</TableCell>
                    <TableCell>{t("required")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.rows.map(({ assignment, index }) => (
                    <TableRow
                      key={`${assignment.mappingKey || assignment.key}-${index}`}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography variant="body2">
                            {translatedAssignmentLabel(assignment)}
                          </Typography>
                          <InfoTooltip
                            id={`${assignment.mappingKey || assignment.key}-${index}`}
                            text={translatedAssignmentDescription(assignment)}
                          />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {displayDatapointKey(assignment.key)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {translatedFeatureLabel(assignment)}
                      </TableCell>
                      <TableCell>{renderUnit(assignment)}</TableCell>
                      <TableCell>
                        {renderPowerTypeSelect(
                          assignment,
                          index,
                          updateAssignment,
                        )}
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={assignment.stateId || ""}
                          onChange={(event) =>
                            updateAssignment(index, {
                              stateId: event.target.value,
                            })
                          }
                          size="small"
                          fullWidth
                          autoComplete="off"
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none",
                            spellCheck: "false",
                            name: `aem-state-path-${index}`,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  aria-label={t("selectStatePath")}
                                  onClick={() => selectStatePath(index)}
                                >
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {customScriptStatePathWarning(assignment.stateId) ? (
                          <Alert
                            className="custom-state-path-warning"
                            severity="error"
                          >
                            {t("customScriptStatePathWarning")}
                          </Alert>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {assignment.required ? (
                          <Chip
                            color="primary"
                            size="small"
                            label={t("required")}
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

function InfoTooltip({ id, text }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  useEffect(
    () => () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    },
    [],
  );
  if (!text) {
    return null;
  }
  function closeLater() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(
      () => setOpen(false),
      TOOLTIP_CLOSE_DELAY_MS,
    );
  }
  function toggle(event) {
    event.preventDefault();
    event.stopPropagation();
    setOpen((current) => {
      const next = !current;
      if (next) {
        closeLater();
      }
      return next;
    });
  }
  return (
    <Tooltip
      disableFocusListener
      disableHoverListener
      disableTouchListener
      onClose={() => setOpen(false)}
      open={open}
      title={text}
      slotProps={{
        tooltip: {
          className: "datapoint-tooltip",
        },
      }}
    >
      <IconButton
        aria-label={t("showInfo")}
        className="datapoint-info-button"
        onClick={toggle}
        onTouchEnd={toggle}
        size="small"
      >
        <HelpOutlineIcon className="datapoint-info-icon" />
      </IconButton>
    </Tooltip>
  );
}

function EmptyState({ text }) {
  return (
    <Paper className="empty-state" elevation={0}>
      <Typography color="text.secondary">{text}</Typography>
    </Paper>
  );
}

function translatedAssignmentLabel(assignment = {}) {
  const key = String(assignment.key || "");
  return translationsEn[key] ? t(key) : assignment.label || key;
}

function translatedAssignmentDescription(assignment = {}) {
  const key = `${String(assignment.key || "")}Help`;
  return translationsEn[key] ? t(key) : assignment.description || "";
}

function translatedFeatureLabel(assignment = {}) {
  const featureKey = String(assignment.feature || "");
  return translationsEn[featureKey]
    ? t(featureKey)
    : assignment.featureLabel || featureKey;
}

function translateScopeName(scopeName) {
  const normalized = String(scopeName || "").trim();
  if (
    /^(\u0048\u0061\u0075\u0073\u0068\u0061\u006c\u0074|Household)$/i.test(
      normalized,
    )
  ) {
    return t("household");
  }
  if (
    /^(\u0041\u006e\u006c\u0061\u0067\u0065|Plant)(\s+\d+)?$/i.test(normalized)
  ) {
    const number = normalized.match(/\d+/)?.[0];
    return number ? t("plantTitle", number).replace(/:$/, "") : t("plant");
  }
  return normalized;
}

const DASHBOARD_TEXT_KEYS = {
  "Battery capacity": "dashboardBatteryCapacity",
  "Consumption forecast": "dashboardConsumptionForecast",
  "PV forecast": "dashboardPvForecast",
  "Energy gap next 24h": "dashboardEnergyGapNext24h",
  "Energy gap incl. reserve": "dashboardEnergyGapNext24h",
  Recommendation: "dashboardRecommendation",
  "Grid charging planned": "dashboardGridChargingPlanned",
  Yes: "yes",
  No: "no",
  "Grid operation": "gridOperation",
  "PV/battery operation": "pvBatteryOperation",
  "Insufficient data": "insufficientData",
  "Charge battery": "chargeBattery",
  "Hold battery": "holdBattery",
  "Use battery": "useBattery",
  "No control": "noControl",
  "Household load from grid, battery is charging":
    "householdLoadFromGridBatteryCharging",
  "Household load from grid, battery is charged briefly":
    "householdLoadFromGridBatteryChargedBriefly",
  "Household load from grid/PV, battery is held":
    "householdLoadFromGridPvBatteryHeld",
  "PV and battery cover consumption, grid charging is not planned":
    "pvBatteryCoverConsumption",
  "PV is preferred": "pvPreferred",
  "Avoid grid import": "avoidGridImport",
  "No active grid charging": "noActiveGridCharging",
  "No reliable decision": "noReliableDecision",
  "Grid power is economical or necessary according to the calculation.":
    "gridPowerEconomical",
  "Battery reserve is preserved until PV yield or a charging window is reached.":
    "batteryReservePreserved",
  "Available battery energy and expected PV yield are sufficient.":
    "batteryPvSufficient",
  "PV yield is used to cover consumption and battery.":
    "pvCoversConsumptionAndBattery",
  "Battery may support household consumption.": "batterySupportsHousehold",
  "No grid charging need detected.": "noGridChargingNeed",
  "Telemetry, forecast or backend data are not sufficient for a decision.":
    "telemetryInsufficient",
  "Grid charging": "gridCharging",
  "Use PV": "usePv",
  "Do not charge": "doNotCharge",
  Hold: "hold",
  Discharge: "discharge",
  "Charge from PV": "chargeFromPv",
  "No action": "noAction",
};

function translateDashboardText(value) {
  const text = String(value || "");
  return DASHBOARD_TEXT_KEYS[text] ? t(DASHBOARD_TEXT_KEYS[text]) : text;
}

function formatDashboardCardValue(card = {}) {
  if (card.value === null || card.value === undefined || card.value === "") {
    return "-";
  }
  return translateDashboardText(card.value);
}

function groupAssignments(assignments) {
  const byKey = new Map();
  let plantGroupCount = 0;
  for (const [index, assignment] of assignments.entries()) {
    const key = `${assignment.scope}:${assignment.scopeId}`;
    if (!byKey.has(key)) {
      const isHousehold = assignment.scope === "household";
      const plantNumber = isHousehold
        ? null
        : Number.isFinite(Number(assignment.plantIndex))
          ? Number(assignment.plantIndex) + 1
          : plantGroupCount + 1;
      if (!isHousehold) {
        plantGroupCount += 1;
      }
      byKey.set(key, {
        key,
        title: isHousehold ? t("generalValues") : t("plantTitle", plantNumber),
        subtitle: translateScopeName(
          assignment.scopeName || (isHousehold ? "Household" : "Plant"),
        ),
        order: isHousehold ? -1 : Number(assignment.plantIndex || 0),
        rows: [],
      });
    }
    byKey.get(key).rows.push({ assignment, index });
  }
  return [...byKey.values()].sort((a, b) => a.order - b.order);
}

function renderUnit(item) {
  if (!String(item.stateId || "").trim()) {
    return <Chip size="small" label="-" />;
  }
  if (item.unit === "W") {
    return <Chip size="small" label={item.sourceUnit === "kW" ? "kW" : "W"} />;
  }
  if (item.unit !== "Wh") {
    return <Chip size="small" label={item.unit || "-"} />;
  }
  return <Chip size="small" label={item.sourceUnit === "kWh" ? "kWh" : "Wh"} />;
}

function renderPowerTypeSelect(item, index, updateAssignment) {
  const fixedPowerType = fixedPowerTypeForItem(item);
  const powerType =
    fixedPowerType || normalizePowerType(item.powerType) || "AC";
  if (fixedPowerType) {
    return <Chip size="small" label={powerType} />;
  }
  if (item.unit !== "W") {
    return null;
  }
  return (
    <TextField
      select
      size="small"
      value={powerType}
      onChange={(event) =>
        updateAssignment(index, { powerType: event.target.value })
      }
      fullWidth
    >
      <MenuItem value="AC">AC</MenuItem>
      <MenuItem value="DC">DC</MenuItem>
    </TextField>
  );
}

function normalizePowerType(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();
  return normalized === "AC" || normalized === "DC" ? normalized : "";
}

function fixedPowerTypeForItem(item = {}) {
  const fixedByKey = {
    consumptionWh: "AC",
    gridExportMeterWh: "AC",
    gridPower: "AC",
    gridTotalPower: "AC",
    pvDailyYield: "DC",
    pvForecast: "DC",
    pvPower: "DC",
    energyMeterPower: "AC",
    wallboxAmpere: "AC",
    wallboxPower: "AC",
    wallboxWh: "AC",
  };
  return fixedByKey[String(item.key || "")] || "";
}

function requiredSettingsComplete(assignments) {
  const items = Array.isArray(assignments) ? assignments : [];
  if (!items.length) {
    return false;
  }
  return items.every(
    (item) =>
      item.required !== true || String(item.stateId || "").trim().length > 0,
  );
}

function customScriptStatePathWarning(stateId) {
  const normalized = String(stateId || "")
    .trim()
    .toLowerCase();
  return (
    normalized.startsWith("0_userdata.") || normalized.startsWith("javascript.")
  );
}

function displayDatapointKey(key) {
  const aliases = {
    consumptionWh: "consumption",
    gridExportMeterWh: "gridExportMeter",
    wallboxWh: "wallbox",
  };
  return aliases[key] || key || "";
}

function formatErrors(result) {
  return result?.errors?.length
    ? t("errorPrefix", result.errors.join(", "))
    : t("errorUnknown");
}

function isErrorStatus(value) {
  return /fehler|failed|error|unauthorized|forbidden|authentication/i.test(
    String(value || ""),
  );
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString(adminLocale());
}

function formatDateTimeMinute(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString(adminLocale(), {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function formatTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleTimeString(adminLocale(), {
        hour: "2-digit",
        minute: "2-digit",
      });
}

function adminLocale() {
  const lang = String(window.sysLang || navigator.language || "en").trim();
  const aliases = {
    "zh-cn": "zh-CN",
  };
  return aliases[lang.toLowerCase()] || lang;
}

function formatTimeRange(from, to) {
  return `${formatTime(from)} - ${formatTime(to)}`;
}

function formatNumber(value, decimals) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(decimals) : "-";
}

function formatNullable(value, decimals) {
  return value === null || value === undefined
    ? "-"
    : formatNumber(value, decimals);
}

function formatBaseLoadProfile(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0
    ? `~${number.toFixed(0)} W`
    : "-/-";
}

function actionClass(action) {
  return String(action || "none").replace(/[^a-zA-Z0-9_-]/g, "_") || "none";
}

function modeClass(slot) {
  return actionClass(slot.operatingMode || slot.action);
}

function detectThemeType({ fallbackToSystem = true } = {}) {
  const match = String(window.location.href).match(
    /[?&#]react=(dark|light)\b/i,
  );
  if (match) {
    return match[1].toLowerCase();
  }
  const candidates = [
    document.documentElement?.dataset?.theme,
    document.documentElement?.dataset?.themeType,
    document.body?.dataset?.theme,
    document.body?.dataset?.themeType,
    document.documentElement?.className,
    document.body?.className,
    document.querySelector('meta[name="theme-color"]')?.content,
    window.localStorage?.getItem("App.theme"),
    window.localStorage?.getItem("App.themeName"),
    window.localStorage?.getItem("App.themeType"),
    window.localStorage?.getItem("theme"),
    window.localStorage?.getItem("themeType"),
  ];
  for (const value of candidates) {
    const normalized = String(value || "").toLowerCase();
    if (/\bdark\b|dark/i.test(normalized)) {
      return "dark";
    }
    if (/\blight\b|blue/i.test(normalized)) {
      return "light";
    }
  }
  if (!fallbackToSystem) {
    return "";
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useObservedThemeType() {
  const [themeType, setThemeType] = useState(() =>
    detectThemeType({ fallbackToSystem: false }),
  );

  useEffect(() => {
    const update = () => {
      setThemeType((current) => {
        const next = detectThemeType({ fallbackToSystem: false });
        return current === next ? current : next;
      });
    };
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-theme-type", "style"],
    });
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "data-theme-type", "style"],
      });
    }
    media?.addEventListener?.("change", update);
    window.addEventListener("storage", update);
    window.addEventListener("focus", update);
    const interval = window.setInterval(update, 1000);
    update();
    return () => {
      observer.disconnect();
      media?.removeEventListener?.("change", update);
      window.removeEventListener("storage", update);
      window.removeEventListener("focus", update);
      window.clearInterval(interval);
    };
  }, []);

  return themeType;
}

export class AemConfig extends React.Component {
  componentDidMount() {
    this.root = createRoot(this.container);
    this.renderApp();
  }

  componentDidUpdate() {
    this.renderApp();
  }

  componentWillUnmount() {
    this.root?.unmount();
  }

  renderApp() {
    this.root?.render(
      <App
        adapterName={this.props.adapterName}
        adminSocket={this.props.socket}
        adminLanguage={this.props.socket?.systemLang}
        adminTheme={this.props.theme}
        adminThemeType={this.props.themeType}
        configData={this.props.data}
        instance={this.props.instance}
        onConfigChange={this.props.onChange}
      />,
    );
  }

  render() {
    return (
      <div
        className="aem-config-root"
        ref={(element) => {
          this.container = element;
        }}
      />
    );
  }
}

export default { AemConfig };

if (window.aemStandaloneConfig) {
  createRoot(document.getElementById("root")).render(<App />);
}
