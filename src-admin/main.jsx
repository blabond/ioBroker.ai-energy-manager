import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Alert,
    Box,
    Button,
    Chip,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    SvgIcon,
    createTheme,
} from '@mui/material';
import translationsDe from '../admin/i18n/de.json';
import translationsEn from '../admin/i18n/en.json';
import translationsEs from '../admin/i18n/es.json';
import translationsFr from '../admin/i18n/fr.json';
import translationsIt from '../admin/i18n/it.json';
import translationsNl from '../admin/i18n/nl.json';
import translationsPl from '../admin/i18n/pl.json';
import translationsPt from '../admin/i18n/pt.json';
import translationsRu from '../admin/i18n/ru.json';
import translationsUk from '../admin/i18n/uk.json';
import translationsZhCn from '../admin/i18n/zh-cn.json';
import './style.css';

const ADMIN_REQUEST_TIMEOUT_MS = 20000;
const UI_UPDATE_CHECK_INTERVAL_MS = 60000;
const PLAN_LEGEND_MODES = [
    ['grid_operation', 'gridOperation'],
    ['pv_battery_operation', 'pvBatteryOperation'],
    ['forecast_pending', 'forecastPending'],
    ['insufficient_data', 'insufficientData'],
];
const PLAN_TIMELINE_HOURS = 6;
const PLAN_TIMELINE_FALLBACK_SLOT_LIMIT = PLAN_TIMELINE_HOURS * 4;

const TOOLTIP_CLOSE_DELAY_MS = 5000;
const SUPPORTED_LANGUAGES = new Set(['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'ru', 'uk', 'zh-cn']);
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
    'zh-cn': translationsZhCn,
};

function createLocalIcon(path, displayName) {
    const Icon = props => (
        <SvgIcon {...props}>
            <path d={path} />
        </SvgIcon>
    );
    Icon.displayName = displayName;
    return Icon;
}

const DashboardIcon = createLocalIcon('M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z', 'DashboardIcon');
const ExpandMoreIcon = createLocalIcon('M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z', 'ExpandMoreIcon');
const HelpOutlineIcon = createLocalIcon(
    'M11 18h2v-2h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4',
    'HelpOutlineIcon',
);
const RefreshIcon = createLocalIcon(
    'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z',
    'RefreshIcon',
);
const SearchIcon = createLocalIcon(
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14',
    'SearchIcon',
);
const SettingsIcon = createLocalIcon(
    'M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98L14.5 2.42C14.47 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42L9.12 5.07c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .47-.18.5-.42l.38-2.65c.61-.25 1.18-.58 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5',
    'SettingsIcon',
);

const ADMIN_TRANSLATIONS = {
    en: {
        ra_Cancel: 'Cancel',
        ra_Ok: 'Ok',
        ra_PleaseSelectObjectId: 'Please select object ID ...',
        ra_Selected: 'Selected',
    },
    de: {
        ra_Cancel: 'Abbrechen',
        ra_Ok: 'OK',
        ra_PleaseSelectObjectId: 'Bitte Objekt-ID auswählen ...',
        ra_Selected: 'Ausgewählt',
    },
    ru: {
        ra_Cancel: 'Отмена',
        ra_Ok: 'Ok',
        ra_PleaseSelectObjectId: 'Пожалуйста, выберите идентификатор объекта ...',
        ra_Selected: 'выбранный',
    },
    pt: {
        ra_Cancel: 'Cancelar',
        ra_Ok: 'Está bem',
        ra_PleaseSelectObjectId: 'Selecione o ID do objeto ...',
        ra_Selected: 'Selecionado',
    },
    nl: {
        ra_Cancel: 'Annuleer',
        ra_Ok: 'OK',
        ra_PleaseSelectObjectId: 'Selecteer object-ID ...',
        ra_Selected: 'Geselecteerd',
    },
    fr: {
        ra_Cancel: 'Annuler',
        ra_Ok: "D'accord",
        ra_PleaseSelectObjectId: "Veuillez sélectionner l'ID d'objet ...",
        ra_Selected: 'Choisi',
    },
    it: {
        ra_Cancel: 'Annulla',
        ra_Ok: 'Ok',
        ra_PleaseSelectObjectId: "Seleziona l'ID oggetto ...",
        ra_Selected: 'Selezionato',
    },
    es: {
        ra_Cancel: 'Cancelar',
        ra_Ok: 'Okay',
        ra_PleaseSelectObjectId: 'Por favor seleccione ID de objeto ...',
        ra_Selected: 'Seleccionado',
    },
    pl: {
        ra_Cancel: 'Anuluj',
        ra_Ok: 'Dobrze',
        ra_PleaseSelectObjectId: 'Wybierz identyfikator obiektu ...',
        ra_Selected: 'Wybrany',
    },
    uk: {
        ra_Cancel: 'Скасувати',
        ra_Ok: 'В порядку',
        ra_PleaseSelectObjectId: "Виберіть ідентифікатор об'єкта ...",
        ra_Selected: 'Вибране',
    },
    'zh-cn': {
        ra_Cancel: '取消',
        ra_Ok: '好',
        ra_PleaseSelectObjectId: '请选择对象ID ...',
        ra_Selected: '已选',
    },
};

const i18n = {
    language: resolveLanguage(window.sysLang || window.systemLang || 'en'),
    translations: mergeTranslations(ADMIN_TRANSLATIONS, ADAPTER_TRANSLATIONS),
    setLanguage(language) {
        this.language = resolveLanguage(language);
    },
    getLanguage() {
        return this.language;
    },
    t(key, ...args) {
        let text = this.translations[this.language]?.[key] || this.translations.en?.[key] || key;
        for (const arg of args) {
            text = text.replace('%s', arg);
        }
        return text;
    },
};

function t(key, ...args) {
    return i18n.t(key, ...args);
}

function resolveLanguage(language) {
    const normalized = String(language || '')
        .trim()
        .toLowerCase();
    if (!normalized) {
        return 'en';
    }
    if (normalized.startsWith('zh')) {
        return 'zh-cn';
    }
    const shortLanguage = normalized.slice(0, 2);
    return SUPPORTED_LANGUAGES.has(normalized)
        ? normalized
        : SUPPORTED_LANGUAGES.has(shortLanguage)
          ? shortLanguage
          : 'en';
}

function mergeTranslations(...translationSets) {
    const merged = {};
    for (const translations of translationSets) {
        for (const [language, words] of Object.entries(translations)) {
            merged[language] = {
                ...(merged[language] || {}),
                ...words,
            };
        }
    }
    return merged;
}

function useAdminLanguage(adminSocket, adminLanguage) {
    const [activeLanguage, setActiveLanguage] = useState(() =>
        resolveLanguage(
            adminLanguage || adminSocket?.systemLang || window.sysLang || window.systemLang || i18n.getLanguage(),
        ),
    );

    useEffect(() => {
        let active = true;
        const immediateLanguage = resolveLanguage(
            adminLanguage || adminSocket?.systemLang || window.sysLang || window.systemLang || i18n.getLanguage(),
        );
        setActiveLanguage(immediateLanguage);

        if (adminSocket?.getObject) {
            adminSocket
                .getObject('system.config')
                .then(systemConfig => {
                    if (!active) {
                        return;
                    }
                    setActiveLanguage(
                        resolveLanguage(systemConfig?.common?.language || adminSocket?.systemLang || immediateLanguage),
                    );
                })
                .catch(() => {});
        }

        return () => {
            active = false;
        };
    }, [adminLanguage, adminSocket]);

    i18n.setLanguage(activeLanguage);
    return activeLanguage;
}

const EMPTY_SETTINGS = {
    adapterToken: '',
    serverConfigLastRequest: '',
    datapointAssignments: [],
    dashboardLite: null,
};

let latestSettings = { ...EMPTY_SETTINGS };
let externalChangeHandler = () => {};
let applySettingsToApp = null;
let latestDashboardLite = null;
let latestDashboardLiteLastRequest = '';

const CURRENT_UI_ASSET = basename(import.meta.url);
const MANIFEST_URL = new URL(/* @vite-ignore */ '../mf-manifest.json', import.meta.url);

function clone(value) {
    return JSON.parse(JSON.stringify(value ?? null));
}

function notifyChanged() {
    externalChangeHandler();
}

function basename(value) {
    return (
        String(value || '')
            .split(/[/?#]/u)
            .filter(Boolean)
            .pop() || ''
    );
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
            dashboardLiteLastRequest: incoming.dashboardLiteLastRequest || latestDashboardLiteLastRequest,
        };
        externalChangeHandler = typeof onChange === 'function' ? onChange : () => {};
        applySettingsToApp?.(latestSettings);
        externalChangeHandler(false);
    };

    window.save = saveSettings;
}

function App({
    adminSocket = null,
    adminTheme = null,
    adminThemeType = '',
    adminLanguage = '',
    adapterName = 'ai-energy-manager',
    configData = null,
    instance = 0,
    onConfigChange = null,
} = {}) {
    useAdminLanguage(adminSocket, adminLanguage);
    const embedded = typeof onConfigChange === 'function';
    const [settings, setSettings] = useState(() => ({
        ...EMPTY_SETTINGS,
        ...(clone(configData) || latestSettings),
    }));
    const [tab, setTab] = useState(0);
    const [requestStatus, setRequestStatus] = useState('');
    const [dashboardStatus, setDashboardStatus] = useState('');
    const [busyConfig, setBusyConfig] = useState(false);
    const [selectStateIndex, setSelectStateIndex] = useState(null);
    const updateAvailable = useUiUpdateAvailable();
    const observedThemeType = useObservedThemeType();
    const settingsRef = useRef(settings);

    applySettingsToApp = nextSettings => {
        if (!embedded) {
            setSettings({ ...nextSettings });
        }
    };

    const themeType =
        observedThemeType || adminThemeType || adminTheme?.palette?.mode || detectThemeType({ fallbackToSystem: true });
    const inheritedTheme = adminTheme?.palette?.mode === themeType ? adminTheme : null;
    const theme = useMemo(
        () =>
            inheritedTheme ||
            createTheme({
                palette: {
                    mode: themeType,
                    primary: { main: '#1976d2' },
                    secondary: { main: '#2e7d32' },
                    background:
                        themeType === 'dark'
                            ? { default: '#101418', paper: '#171d22' }
                            : { default: '#f5f7fa', paper: '#ffffff' },
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
            dashboardLiteLastRequest: settingsRef.current.dashboardLiteLastRequest || latestDashboardLiteLastRequest,
        };
        latestSettings = nextSettings;
        settingsRef.current = nextSettings;
        setSettings(nextSettings);
    }, [configData, embedded]);

    function updateSettings(updater, changed = true) {
        const next = typeof updater === 'function' ? updater(clone(settingsRef.current)) : updater;
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
        updateSettings(draft => ({ ...draft, [name]: value }));
    }

    function sendToAdapter(command, message, callback) {
        if (adminSocket?.sendTo) {
            adminSocket
                .sendTo(`${adapterName}.${instance}`, command, message)
                .then(result => callback(result))
                .catch(error => callback({ ok: false, errors: [error?.message || String(error)] }));
            return;
        }
        if (window.sendTo) {
            window.sendTo(null, command, message, callback);
            return;
        }
        callback({
            ok: false,
            errors: [t('adminConnectionUnavailable')],
        });
    }

    function requestConfig() {
        const token = String(settings.adapterToken || '').trim();
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
            setRequestStatus(t('adapterNoResponse'));
        }, ADMIN_REQUEST_TIMEOUT_MS);
        setBusyConfig(true);
        setRequestStatus(t('configLoading'));
        sendToAdapter('requestConfig', { source: 'admin', adapterToken: token }, result => {
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
            updateSettings(draft => ({
                ...draft,
                serverConfig: result.serverConfig || draft.serverConfig,
                serverConfigLastRequest: result.serverConfigLastRequest || '',
                datapointAssignments: result.datapointAssignments || draft.datapointAssignments || [],
            }));
            setRequestStatus(t('configLoaded'));
        });
    }

    function applyServerConfigState(result) {
        if (!result || result.ok === false || !result.serverConfig) {
            return;
        }
        const nextLastRequest = String(result.serverConfigLastRequest || '');
        updateSettings(
            draft => ({
                ...draft,
                serverConfig: result.serverConfig,
                serverConfigLastRequest: nextLastRequest,
                datapointAssignments: result.datapointAssignments || draft.datapointAssignments || [],
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
            sendToAdapter('readServerConfigState', {}, result => {
                if (!active) {
                    return;
                }
                applyServerConfigState(result);
            });
        }
        function readDashboardLiteState(refresh = false) {
            sendToAdapter('readDashboardLiteState', { refresh }, result => {
                if (!active) {
                    return;
                }
                if (!result || result.ok === false) {
                    setDashboardStatus(formatErrors(result));
                    return;
                }
                if (result.dashboardLite) {
                    latestDashboardLite = result.dashboardLite;
                    latestDashboardLiteLastRequest = result.dashboardLiteLastRequest || '';
                }
                updateSettings(
                    draft => ({
                        ...draft,
                        dashboardLite: result.dashboardLite || draft.dashboardLite || null,
                        dashboardLiteLastRequest:
                            result.dashboardLiteLastRequest || draft.dashboardLiteLastRequest || '',
                    }),
                    false,
                );
                setDashboardStatus(
                    result.dashboardLiteLastRequest
                        ? t('autoUpdated', formatDateTime(result.dashboardLiteLastRequest))
                        : t('waitingForDashboardData'),
                );
            });
        }
        readServerConfigState();
        readDashboardLiteState(true);
        const dashboardInterval = window.setInterval(() => readDashboardLiteState(false), 15000);
        return () => {
            active = false;
            window.clearInterval(dashboardInterval);
        };
    }, []);

    function updateAssignment(index, patch) {
        updateSettings(draft => {
            const assignments = Array.isArray(draft.datapointAssignments) ? [...draft.datapointAssignments] : [];
            assignments[index] = { ...(assignments[index] || {}), ...patch };
            return { ...draft, datapointAssignments: assignments };
        });
    }

    const readStateObjectsFromAdapter = useCallback(() => {
        return new Promise((resolve, reject) => {
            const callback = result => {
                if (!result || result.ok === false) {
                    reject(new Error(formatErrors(result)));
                    return;
                }
                resolve(normalizeStateList(Array.isArray(result.states) ? result.states : []));
            };
            if (adminSocket?.sendTo) {
                adminSocket
                    .sendTo(`${adapterName}.${instance}`, 'readStateObjects', {})
                    .then(callback)
                    .catch(error => reject(error instanceof Error ? error : new Error(String(error))));
                return;
            }
            if (window.sendTo) {
                window.sendTo(null, 'readStateObjects', {}, callback);
                return;
            }
            reject(new Error(t('adminConnectionUnavailable')));
        });
    }, [adapterName, adminSocket, instance]);

    async function selectStatePath(index) {
        const current = settings.datapointAssignments?.[index]?.stateId || '';
        if (canSendToAdapter(adminSocket)) {
            setSelectStateIndex(index);
            return;
        }
        try {
            const selected = await window.aemSelectStatePath?.(current);
            if (selected) {
                updateAssignment(index, { stateId: selected });
            }
        } catch (error) {
            setRequestStatus(error?.message || t('objectSelectionUnavailable'));
        }
    }

    const hasToken = String(settings.adapterToken || '').trim().length > 0;
    const hasValidToken = hasToken && settings.serverConfig?.valid === true;
    const hasRequiredSettings =
        isDemoAccountToken(settings.adapterToken) || requiredSettingsComplete(settings.datapointAssignments || []);

    return (
        <ThemeProvider theme={theme}>
            <Box className={`aem-root${embedded ? ' aem-root-embedded' : ''}`}>
                <Paper
                    className="aem-shell"
                    elevation={0}
                >
                    <Stack spacing={2}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent="space-between"
                            gap={1}
                        >
                            <Box className="header-content">
                                <Typography
                                    variant="h6"
                                    component="h1"
                                >
                                    AI Energy Manager
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {t('noAccountOrToken')}{' '}
                                    <a
                                        href="https://smartenergy.mr-bond.de"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {t('openSmartEnergyPortal')}
                                    </a>
                                </Typography>
                                {updateAvailable ? <UpdateAvailableNotice /> : null}
                            </Box>
                        </Stack>

                        <Tabs
                            value={tab}
                            onChange={(_, value) => setTab(value)}
                        >
                            <Tab
                                icon={<DashboardIcon />}
                                iconPosition="start"
                                label={t('dashboard')}
                            />
                            <Tab
                                icon={<SettingsIcon />}
                                iconPosition="start"
                                label={t('settings')}
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
            {canSendToAdapter(adminSocket) && selectStateIndex !== null ? (
                <StateSelectDialog
                    loadStates={readStateObjectsFromAdapter}
                    onClose={() => setSelectStateIndex(null)}
                    onOk={selected => {
                        if (typeof selected === 'string' && selected) {
                            updateAssignment(selectStateIndex, { stateId: selected });
                        }
                        setSelectStateIndex(null);
                    }}
                    selected={settings.datapointAssignments?.[selectStateIndex]?.stateId || ''}
                    title={t('selectStatePathTitle')}
                />
            ) : null}
        </ThemeProvider>
    );
}

function StateSelectDialog({ loadStates, onClose, onOk, selected, title }) {
    const [filter, setFilter] = useState('');
    const [states, setStates] = useState([]);
    const [activeState, setActiveState] = useState(selected || '');
    const [expandedNodes, setExpandedNodes] = useState(() => new Set(getStateAncestorIds(selected)));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        loadStates()
            .then(objects => {
                if (!active) {
                    return;
                }
                setStates(objects);
                setLoading(false);
            })
            .catch(loadError => {
                if (!active) {
                    return;
                }
                setError(loadError?.message || t('objectSelectionUnavailable'));
                setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [loadStates]);

    const tree = useMemo(() => buildStateTree(states, filter), [filter, states]);

    const selectedState = states.find(state => state.id === activeState);
    const activeStateInfo = tree.stateById.get(activeState);
    const dialogTitle =
        selectedState || activeState ? (
            <span>
                {t('ra_Selected')} <strong>{selectedState?.name || activeState}</strong>
                {selectedState?.name && selectedState.id !== selectedState.name ? ` [${selectedState.id}]` : ''}
            </span>
        ) : (
            title || t('ra_PleaseSelectObjectId')
        );

    useEffect(() => {
        if (!activeState) {
            return;
        }
        setExpandedNodes(previous => {
            const next = new Set(previous);
            for (const id of getStateAncestorIds(activeState)) {
                next.add(id);
            }
            return next;
        });
    }, [activeState]);

    useEffect(() => {
        if (!filter.trim()) {
            return;
        }
        setExpandedNodes(previous => new Set([...previous, ...tree.matchAncestorIds]));
    }, [filter, tree.matchAncestorIds]);

    function toggleExpanded(nodeId) {
        setExpandedNodes(previous => {
            const next = new Set(previous);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
    }

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open
            onClose={onClose}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent className="state-select-dialog-content">
                <TextField
                    autoFocus
                    fullWidth
                    label={t('selectStatePath')}
                    margin="dense"
                    value={filter}
                    onChange={event => setFilter(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {error ? <Alert severity="error">{error}</Alert> : null}
                {loading ? <Alert severity="info">{t('configLoading')}</Alert> : null}
                {!loading && !error ? (
                    <Box className="state-select-tree">
                        {tree.nodes.length ? (
                            tree.nodes.map(node => (
                                <StateTreeNode
                                    activeState={activeState}
                                    expandedNodes={expandedNodes}
                                    key={node.id}
                                    level={0}
                                    node={node}
                                    onOk={onOk}
                                    onSelect={setActiveState}
                                    onToggle={toggleExpanded}
                                />
                            ))
                        ) : (
                            <Typography color="text.secondary">
                                {states.length ? t('noStateObjectsForFilter') : t('noStateObjects')}
                            </Typography>
                        )}
                    </Box>
                ) : null}
                {activeStateInfo ? (
                    <Box className="state-select-details">
                        <Typography
                            variant="body2"
                            className="state-select-details-id"
                        >
                            {activeStateInfo.id}
                        </Typography>
                        <Stack
                            direction="row"
                            gap={1}
                            flexWrap="wrap"
                        >
                            <Chip
                                size="small"
                                label={activeStateInfo.type || '-'}
                            />
                            {activeStateInfo.role ? (
                                <Chip
                                    size="small"
                                    label={activeStateInfo.role}
                                />
                            ) : null}
                            <Chip
                                size="small"
                                label={formatStateValue(activeStateInfo.value)}
                            />
                        </Stack>
                    </Box>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('ra_Cancel')}</Button>
                <Button
                    variant="contained"
                    disabled={!activeState}
                    onClick={() => onOk(activeState)}
                >
                    {t('ra_Ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function StateTreeNode({ activeState, expandedNodes, level, node, onOk, onSelect, onToggle }) {
    const hasChildren = node.children.length > 0;
    const expanded = expandedNodes.has(node.id);
    const selected = node.state?.id === activeState;
    return (
        <Box>
            <Box
                className={`state-tree-row${selected ? ' state-tree-row-selected' : ''}`}
                style={{ paddingLeft: `${level * 18 + 4}px` }}
                onClick={() => {
                    if (node.state) {
                        onSelect(node.state.id);
                    } else if (hasChildren) {
                        onToggle(node.id);
                    }
                }}
                onDoubleClick={() => {
                    if (node.state) {
                        onOk(node.state.id);
                    }
                }}
            >
                <IconButton
                    className={`state-tree-toggle${expanded ? ' state-tree-toggle-open' : ''}`}
                    disabled={!hasChildren}
                    size="small"
                    onClick={event => {
                        event.stopPropagation();
                        onToggle(node.id);
                    }}
                >
                    {hasChildren ? <ExpandMoreIcon /> : null}
                </IconButton>
                <Box className={`state-tree-icon state-tree-icon-${node.state ? 'state' : 'folder'}`}>
                    {node.state ? 'S' : ''}
                </Box>
                <Box className="state-tree-labels">
                    <Typography variant="body2">{node.label}</Typography>
                    {node.state ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {node.state.id}
                        </Typography>
                    ) : null}
                </Box>
            </Box>
            {hasChildren ? (
                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                >
                    {node.children.map(child => (
                        <StateTreeNode
                            activeState={activeState}
                            expandedNodes={expandedNodes}
                            key={child.id}
                            level={level + 1}
                            node={child}
                            onOk={onOk}
                            onSelect={onSelect}
                            onToggle={onToggle}
                        />
                    ))}
                </Collapse>
            ) : null}
        </Box>
    );
}

function DashboardTab({ dashboardStatus, hasRequiredSettings, hasValidToken, settings }) {
    if (!hasValidToken) {
        return <Alert severity="warning">{t('settingsTokenMissing')}</Alert>;
    }
    if (!hasRequiredSettings) {
        return <Alert severity="warning">{t('dashboardRequiredMissing')}</Alert>;
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
    const assignmentGroups = useMemo(() => groupAssignments(assignments), [assignments]);
    const defaultExpandedPanels = useMemo(() => {
        const panels = {};
        for (const group of assignmentGroups) {
            panels[`group:${group.key}`] = groupHasMissingRequiredState(group);
        }
        return panels;
    }, [assignmentGroups]);
    const [expandedPanels, setExpandedPanels] = useState(defaultExpandedPanels);

    useEffect(() => {
        setExpandedPanels(current => {
            const next = {};
            for (const [key, defaultExpanded] of Object.entries(defaultExpandedPanels)) {
                next[key] = Object.prototype.hasOwnProperty.call(current, key) ? current[key] : defaultExpanded;
            }
            return next;
        });
    }, [defaultExpandedPanels]);

    function togglePanel(key) {
        setExpandedPanels(current => ({
            ...current,
            [key]: !current[key],
        }));
    }

    return (
        <Stack spacing={2}>
            <Section title={t('connection')}>
                <Box className="settings-field-grid">
                    <TextField
                        label={t('adapterToken')}
                        type="password"
                        value={settings.adapterToken || ''}
                        onChange={event => setField('adapterToken', event.target.value)}
                        autoComplete="off"
                        fullWidth
                    />
                    <TextField
                        label={t('lastConfigRequest')}
                        value={formatDateTime(settings.serverConfigLastRequest)}
                        InputProps={{ readOnly: true }}
                        fullWidth
                    />
                </Box>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    gap={1}
                    sx={{ mt: 2 }}
                >
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
                    <Alert severity={isErrorStatus(requestStatus) ? 'error' : 'info'}>{requestStatus}</Alert>
                ) : null}
            </Section>
            <DatapointsTab
                groups={assignmentGroups}
                expandedPanels={expandedPanels}
                selectStatePath={selectStatePath}
                togglePanel={togglePanel}
                updateAssignment={updateAssignment}
            />
            <Alert severity="info">{t('acDcInfo')}</Alert>
        </Stack>
    );
}

function UpdateAvailableNotice() {
    return (
        <Alert
            severity="info"
            icon={false}
            className="update-notice"
        >
            <Box className="update-notice-content">
                <Typography variant="body2">{t('uiUpdateAvailable')}</Typography>
                <Box className="update-notice-spacer" />
                <Button
                    variant="contained"
                    size="small"
                    onClick={reloadWithCacheBust}
                >
                    {t('reloadNow')}
                </Button>
            </Box>
        </Alert>
    );
}

function DashboardLite({ dashboard, lastRequest }) {
    if (!dashboard) {
        return <EmptyState text={t('noDashboardData')} />;
    }
    const dataTimestamp = dashboard.decisionTime || lastRequest || '';
    return (
        <Stack spacing={2}>
            <Section
                title="Dashboard"
                titleAction={
                    dataTimestamp ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {t('dashboardDataAsOf', formatDateTimeMinute(dataTimestamp))}
                        </Typography>
                    ) : null
                }
            >
                <Box className="card-grid">
                    {(dashboard.cards || []).map((card, index) => (
                        <Paper
                            className="metric-card"
                            key={`${card.label || 'card'}-${index}`}
                        >
                            <Typography variant="h6">
                                {formatDashboardCardValue(card)}
                                {card.unit ? <span> {card.unit}</span> : null}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {translateDashboardText(card.label || '')}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
                {dashboard.reasonText || dashboard.reason ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {translateDashboardText(dashboard.reasonText || dashboard.reason)}
                    </Typography>
                ) : null}
            </Section>
            <Section title={t('sixHourPlan')}>
                <PlanTimeline plan={dashboard.plan || []} />
            </Section>
        </Stack>
    );
}

function Section({
    children,
    title,
    titleAction = null,
    collapsible = false,
    expanded = true,
    onToggle = null,
    className = '',
}) {
    const content = collapsible ? (
        <Collapse
            in={expanded}
            timeout="auto"
        >
            <Box className="section-collapse-content">{children}</Box>
        </Collapse>
    ) : (
        children
    );
    return (
        <Paper
            className={`section${className ? ` ${className}` : ''}`}
            elevation={0}
        >
            <Box className="section-title-row">
                <Box className="section-title-main">
                    {collapsible ? (
                        <IconButton
                            aria-label={expanded ? t('collapseSection') : t('expandSection')}
                            className={`section-toggle${expanded ? ' section-toggle-open' : ''}`}
                            onClick={onToggle}
                            size="small"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    ) : null}
                    <Typography
                        variant="subtitle1"
                        component="h2"
                    >
                        {title}
                    </Typography>
                </Box>
                {titleAction ? <Box className="section-title-action">{titleAction}</Box> : null}
            </Box>
            {content}
        </Paper>
    );
}

function PlanTimeline({ plan }) {
    if (!plan.length) {
        return <EmptyState text={t('noSixHourPlan')} />;
    }
    const slots = visiblePlanTimelineSlots(plan);
    const groups = groupPlanSlotsByHour(slots);
    return (
        <Stack spacing={1.5}>
            <Box
                className="plan-timeline"
                aria-label={t('sixHourPlan')}
            >
                {groups.map(group => (
                    <Box
                        className="plan-hour-group"
                        key={group.key}
                    >
                        <Box className="plan-hour-header">
                            <Typography variant="caption">{group.label}</Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {formatNumber(group.plannedEnergyKwh, 2)} kWh
                            </Typography>
                        </Box>
                        <Box className="plan-hour-slots">
                            {group.slots.map((slot, index) => (
                                <Tooltip
                                    key={`${slot.from || index}-${slot.action || 'none'}`}
                                    title={`${formatTimeRange(slot.from, slot.to)} · ${translateDashboardText(
                                        slot.operatingModeLabelText ||
                                            slot.actionLabelText ||
                                            slot.operatingModeLabel ||
                                            slot.actionLabel ||
                                            '-',
                                    )} · ${translateDashboardText(
                                        slot.batteryCommandText || slot.batteryCommand || '-',
                                    )} · ${translateDashboardText(
                                        slot.gridBehaviorText || slot.gridBehavior || '-',
                                    )} · ${formatNumber(slot.plannedPowerW, 0)} W · ${formatNumber(
                                        slot.plannedEnergyKwh,
                                        2,
                                    )} kWh${
                                        slot.technicalActionLabel
                                            ? ` · ${t(
                                                  'technicalAction',
                                                  translateDashboardText(slot.technicalActionLabel),
                                              )}`
                                            : ''
                                    }${
                                        slot.reasonText || slot.reason
                                            ? ` · ${translateDashboardText(slot.reasonText || slot.reason)}`
                                            : ''
                                    }`}
                                >
                                    <Box
                                        className={`plan-slot mode-border-${modeClass(slot)}`}
                                        tabIndex={0}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {formatTimeRange(slot.from, slot.to)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="plan-slot-action"
                                            noWrap
                                        >
                                            {translateDashboardText(
                                                slot.operatingModeLabelText ||
                                                    slot.actionLabelText ||
                                                    slot.operatingModeLabel ||
                                                    slot.actionLabel ||
                                                    '-',
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            className="plan-slot-command"
                                            noWrap
                                        >
                                            {translateDashboardText(
                                                slot.batteryCommandText || slot.batteryCommand || '-',
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {formatNumber(slot.plannedPowerW, 0)} W{' · '}
                                            {formatNumber(slot.plannedEnergyKwh, 2)} kWh
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>
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

function visiblePlanTimelineSlots(plan) {
    const slots = Array.isArray(plan) ? plan : [];
    const firstSlotStart = slots
        .map(slot => Date.parse(slot?.from || slot?.slot_start || ''))
        .find(time => Number.isFinite(time));

    if (!Number.isFinite(firstSlotStart)) {
        return slots.slice(0, PLAN_TIMELINE_FALLBACK_SLOT_LIMIT);
    }

    const windowEnd = firstSlotStart + PLAN_TIMELINE_HOURS * 60 * 60 * 1000;
    return slots.filter(slot => {
        const start = Date.parse(slot?.from || slot?.slot_start || '');
        return Number.isFinite(start) && start < windowEnd;
    });
}

function groupPlanSlotsByHour(slots) {
    const groups = [];
    const byKey = new Map();
    const firstSlotStart = slots
        .map(slot => Date.parse(slot?.from || slot?.slot_start || ''))
        .find(time => Number.isFinite(time));

    for (const slot of slots) {
        const start = Date.parse(slot.from || slot.slot_start || '');
        const end = Date.parse(slot.to || slot.slot_end || '');
        const key =
            Number.isFinite(firstSlotStart) && Number.isFinite(start)
                ? `hour-${Math.floor((start - firstSlotStart) / (60 * 60 * 1000))}`
                : `unknown-${groups.length}`;
        if (!byKey.has(key)) {
            const group = {
                key,
                start,
                end,
                label: '-',
                plannedEnergyKwh: 0,
                slots: [],
            };
            groups.push(group);
            byKey.set(key, group);
        }
        const group = byKey.get(key);
        if (Number.isFinite(start)) {
            group.start = Number.isFinite(group.start) ? Math.min(group.start, start) : start;
        }
        if (Number.isFinite(end)) {
            group.end = Number.isFinite(group.end) ? Math.max(group.end, end) : end;
        }
        group.label =
            Number.isFinite(group.start) && Number.isFinite(group.end)
                ? `${formatTime(new Date(group.start))} - ${formatTime(new Date(group.end))}`
                : '-';
        group.plannedEnergyKwh += Number(slot.plannedEnergyKwh || 0);
        group.slots.push(slot);
    }
    return groups;
}

function Metric({ label, value }) {
    return (
        <Paper
            className="metric-card"
            elevation={0}
        >
            <Typography variant="h6">{value}</Typography>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>
        </Paper>
    );
}

function DatapointsTab({ groups, expandedPanels, selectStatePath, togglePanel, updateAssignment }) {
    if (!groups.length) {
        return <EmptyState text={t('noDatapointAssignments')} />;
    }
    return (
        <Stack spacing={2}>
            {groups.map(group => {
                const panelKey = `group:${group.key}`;
                return (
                    <Section
                        className="group-card"
                        collapsible
                        expanded={expandedPanels[panelKey] === true}
                        key={group.key}
                        onToggle={() => togglePanel(panelKey)}
                        title={group.title}
                        titleAction={
                            group.subtitle ? (
                                <Chip
                                    size="small"
                                    label={group.subtitle}
                                />
                            ) : null
                        }
                    >
                        <Stack spacing={1}>
                            <Divider />
                            <TableContainer>
                                <Table
                                    size="small"
                                    className="datapoint-table"
                                >
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
                                            <TableCell>{t('value')}</TableCell>
                                            <TableCell>{t('type')}</TableCell>
                                            <TableCell>{t('unit')}</TableCell>
                                            <TableCell>AC/DC</TableCell>
                                            <TableCell>ioBroker State-Path</TableCell>
                                            <TableCell>{t('required')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupAssignmentSections(group).map(section => (
                                            <React.Fragment key={section.key}>
                                                {section.showTitle ? (
                                                    <TableRow className="datapoint-section-row">
                                                        <TableCell colSpan={6}>{section.title}</TableCell>
                                                    </TableRow>
                                                ) : null}
                                                {section.rows.map(({ assignment, index }) => (
                                                    <DatapointAssignmentRow
                                                        assignment={assignment}
                                                        index={index}
                                                        key={`${assignment.mappingKey || assignment.key}-${index}`}
                                                        selectStatePath={selectStatePath}
                                                        updateAssignment={updateAssignment}
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Section>
                );
            })}
        </Stack>
    );
}

function DatapointAssignmentRow({ assignment, index, selectStatePath, updateAssignment }) {
    return (
        <TableRow>
            <TableCell>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                >
                    <Typography variant="body2">{translatedAssignmentLabel(assignment)}</Typography>
                    <InfoTooltip
                        id={`${assignment.mappingKey || assignment.key}-${index}`}
                        text={translatedAssignmentDescription(assignment)}
                    />
                </Stack>
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {displayDatapointKey(assignment.key)}
                </Typography>
            </TableCell>
            <TableCell>{translatedFeatureLabel(assignment)}</TableCell>
            <TableCell>{renderUnit(assignment, index, updateAssignment)}</TableCell>
            <TableCell>{renderPowerTypeSelect(assignment, index, updateAssignment)}</TableCell>
            <TableCell>
                <TextField
                    value={assignment.stateId || ''}
                    onChange={event =>
                        updateAssignment(index, {
                            stateId: event.target.value,
                        })
                    }
                    size="small"
                    fullWidth
                    autoComplete="off"
                    inputProps={{
                        autoComplete: 'off',
                        autoCorrect: 'off',
                        autoCapitalize: 'none',
                        spellCheck: 'false',
                        name: `aem-state-path-${index}`,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label={t('selectStatePath')}
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
                        {t('customScriptStatePathWarning')}
                    </Alert>
                ) : null}
                {isBatteryControlAssignment(assignment) ? (
                    <ControlValueFields
                        assignment={assignment}
                        index={index}
                        updateAssignment={updateAssignment}
                    />
                ) : null}
            </TableCell>
            <TableCell>
                {assignment.required ? (
                    <Chip
                        color="primary"
                        size="small"
                        label={t('required')}
                    />
                ) : null}
            </TableCell>
        </TableRow>
    );
}

function ControlValueFields({ assignment, index, updateAssignment }) {
    const values = assignment.controlValues || {};
    function setControlValue(name, value) {
        updateAssignment(index, {
            controlValues: {
                ...values,
                [name]: value,
            },
        });
    }
    return (
        <Box className="control-value-grid">
            <TextField
                label={t('batteryControlGridChargeValue')}
                size="small"
                value={values.gridCharge || ''}
                onChange={event => setControlValue('gridCharge', event.target.value)}
                fullWidth
            />
            <TextField
                label={t('batteryControlPvValue')}
                size="small"
                value={values.pv || ''}
                onChange={event => setControlValue('pv', event.target.value)}
                fullWidth
            />
            <TextField
                label={t('batteryControlHoldValue')}
                size="small"
                value={values.hold || ''}
                onChange={event => setControlValue('hold', event.target.value)}
                fullWidth
            />
        </Box>
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
        closeTimer.current = window.setTimeout(() => setOpen(false), TOOLTIP_CLOSE_DELAY_MS);
    }
    function toggle(event) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(current => {
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
                    className: 'datapoint-tooltip',
                },
            }}
        >
            <IconButton
                aria-label={t('showInfo')}
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
        <Paper
            className="empty-state"
            elevation={0}
        >
            <Typography color="text.secondary">{text}</Typography>
        </Paper>
    );
}

function translatedAssignmentLabel(assignment = {}) {
    const key = String(assignment.key || '');
    return translationsEn[key] ? t(key) : assignment.label || key;
}

function translatedAssignmentDescription(assignment = {}) {
    const key = `${String(assignment.key || '')}Help`;
    return translationsEn[key] ? t(key) : assignment.description || '';
}

function isBatteryControlAssignment(assignment = {}) {
    return String(assignment.key || '') === 'batteryControlMode';
}

function translatedFeatureLabel(assignment = {}) {
    const featureKey = String(assignment.feature || '');
    return translationsEn[featureKey] ? t(featureKey) : assignment.featureLabel || featureKey;
}

function translateScopeName(scopeName) {
    const normalized = String(scopeName || '').trim();
    if (/^(\u0048\u0061\u0075\u0073\u0068\u0061\u006c\u0074|Household)$/i.test(normalized)) {
        return t('household');
    }
    if (/^(\u0041\u006e\u006c\u0061\u0067\u0065|Plant)(\s+\d+)?$/i.test(normalized)) {
        const number = normalized.match(/\d+/)?.[0];
        return number ? t('plantTitle', number).replace(/:$/, '') : t('plant');
    }
    return normalized;
}

const DASHBOARD_TEXT_KEYS = {
    'Battery capacity': 'dashboardBatteryCapacity',
    'Consumption forecast': 'dashboardConsumptionForecast',
    'PV forecast': 'dashboardPvForecast',
    'Energy gap next 24h': 'dashboardEnergyGapNext24h',
    'Energy gap incl. reserve': 'dashboardEnergyGapNext24h',
    Recommendation: 'dashboardRecommendation',
    'Grid charging planned': 'dashboardGridChargingPlanned',
    'Base load': 'dashboardBaseLoad',
    Yes: 'yes',
    No: 'no',
    'Grid operation': 'gridOperation',
    'PV/battery operation': 'pvBatteryOperation',
    'Forecast pending': 'forecastPending',
    'Insufficient data': 'insufficientData',
    'Charge battery': 'chargeBattery',
    'Hold battery': 'holdBattery',
    'Use battery': 'useBattery',
    'No control': 'noControl',
    'No planning': 'noPlanning',
    'Household load from grid, battery is charging': 'householdLoadFromGridBatteryCharging',
    'Household load from grid, battery is charged briefly': 'householdLoadFromGridBatteryChargedBriefly',
    'Household load from grid/PV, battery is held': 'householdLoadFromGridPvBatteryHeld',
    'PV and battery cover consumption, grid charging is not planned': 'pvBatteryCoverConsumption',
    'PV is preferred': 'pvPreferred',
    'Avoid grid import': 'avoidGridImport',
    'No active grid charging': 'noActiveGridCharging',
    'Required forecast data is still pending': 'requiredForecastPending',
    'The planning window continues once all required forecast data is available.': 'planningWindowContinues',
    'No reliable decision': 'noReliableDecision',
    'Grid power is economical or necessary according to the calculation.': 'gridPowerEconomical',
    'Battery reserve is preserved until PV yield or a charging window is reached.': 'batteryReservePreserved',
    'Available battery energy and expected PV yield are sufficient.': 'batteryPvSufficient',
    'PV yield is used to cover consumption and battery.': 'pvCoversConsumptionAndBattery',
    'Battery may support household consumption.': 'batterySupportsHousehold',
    'No grid charging need detected.': 'noGridChargingNeed',
    'Telemetry, forecast or backend data are not sufficient for a decision.': 'telemetryInsufficient',
    'Grid charging': 'gridCharging',
    'Use PV': 'usePv',
    'Do not charge': 'doNotCharge',
    Hold: 'hold',
    Discharge: 'discharge',
    'Charge from PV': 'chargeFromPv',
    'No action': 'noAction',
};

function translateDashboardText(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        const lang = normalizedDashboardLanguage();
        return String(value[lang] || value.en || value.de || Object.values(value).find(Boolean) || '');
    }
    const text = String(value || '');
    return DASHBOARD_TEXT_KEYS[text] ? t(DASHBOARD_TEXT_KEYS[text]) : text;
}

function normalizedDashboardLanguage() {
    const lang = String(i18n.getLanguage?.() || window.sysLang || navigator.language || 'en')
        .trim()
        .toLowerCase()
        .split('-')[0];
    return lang === 'de' ? 'de' : 'en';
}

function formatDashboardCardValue(card = {}) {
    if (card.value === null || card.value === undefined || card.value === '') {
        return '-';
    }
    if (card.label === 'Base load') {
        return `~${translateDashboardText(card.value)}`;
    }
    return translateDashboardText(card.value);
}

function groupAssignments(assignments) {
    const byKey = new Map();
    let plantGroupCount = 0;
    for (const [index, assignment] of assignments.entries()) {
        const key = `${assignment.scope}:${assignment.scopeId}`;
        if (!byKey.has(key)) {
            const isHousehold = assignment.scope === 'household';
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
                title: isHousehold ? t('generalValues') : t('plantTitle', plantNumber),
                subtitle: translateScopeName(assignment.scopeName || (isHousehold ? 'Household' : 'Plant')),
                order: isHousehold ? -1 : Number(assignment.plantIndex || 0),
                rows: [],
            });
        }
        byKey.get(key).rows.push({ assignment, index });
    }
    return [...byKey.values()].sort((a, b) => a.order - b.order);
}

function groupHasMissingRequiredState(group) {
    return group.rows.some(
        ({ assignment }) => assignment.required === true && String(assignment.stateId || '').trim().length === 0,
    );
}

function groupAssignmentSections(group) {
    const controlRows = group.rows.filter(({ assignment }) => isBatteryControlAssignment(assignment));
    if (!controlRows.length) {
        return [
            {
                key: 'all',
                title: '',
                showTitle: false,
                rows: group.rows,
            },
        ];
    }
    const telemetryRows = group.rows.filter(({ assignment }) => !isBatteryControlAssignment(assignment));
    return [
        {
            key: 'telemetry',
            title: t('telemetryDataSend'),
            showTitle: telemetryRows.length > 0,
            rows: telemetryRows,
        },
        {
            key: 'battery-control',
            title: t('ioBrokerBatteryControl'),
            showTitle: true,
            rows: controlRows,
        },
    ].filter(section => section.rows.length > 0);
}

function renderUnit(item, index, updateAssignment) {
    if (isBatteryControlAssignment(item)) {
        return renderGridChargingSelect(item, index, updateAssignment);
    }
    if (!String(item.stateId || '').trim()) {
        return (
            <Chip
                size="small"
                label="-"
            />
        );
    }
    if (item.unit === 'W') {
        return (
            <Chip
                size="small"
                label={item.sourceUnit === 'kW' ? 'kW' : 'W'}
            />
        );
    }
    if (item.unit !== 'Wh') {
        return (
            <Chip
                size="small"
                label={item.unit || '-'}
            />
        );
    }
    return (
        <Chip
            size="small"
            label={item.sourceUnit === 'kWh' ? 'kWh' : 'Wh'}
        />
    );
}

function renderGridChargingSelect(item, index, updateAssignment) {
    return (
        <TextField
            label={t('gridChargingPermission')}
            select
            size="small"
            value={item.gridChargingAllowed === false ? 'deny' : 'allow'}
            onChange={event =>
                updateAssignment(index, {
                    gridChargingAllowed: event.target.value === 'allow',
                })
            }
            fullWidth
        >
            <MenuItem value="allow">{t('allow')}</MenuItem>
            <MenuItem value="deny">{t('deny')}</MenuItem>
        </TextField>
    );
}

function renderPowerTypeSelect(item, index, updateAssignment) {
    const fixedPowerType = fixedPowerTypeForItem(item);
    const powerType = fixedPowerType || normalizePowerType(item.powerType) || 'AC';
    if (fixedPowerType) {
        return (
            <Chip
                size="small"
                label={powerType}
            />
        );
    }
    if (item.unit !== 'W') {
        return null;
    }
    return (
        <TextField
            select
            size="small"
            value={powerType}
            onChange={event => updateAssignment(index, { powerType: event.target.value })}
            fullWidth
        >
            <MenuItem value="AC">AC</MenuItem>
            <MenuItem value="DC">DC</MenuItem>
        </TextField>
    );
}

function normalizePowerType(value) {
    const normalized = String(value || '')
        .trim()
        .toUpperCase();
    return normalized === 'AC' || normalized === 'DC' ? normalized : '';
}

function fixedPowerTypeForItem(item = {}) {
    const fixedByKey = {
        consumptionWh: 'AC',
        gridExportMeterWh: 'AC',
        gridPower: 'AC',
        gridTotalPower: 'AC',
        pvDailyYield: 'DC',
        pvForecast: 'DC',
        pvPower: 'DC',
        energyMeterPower: 'AC',
        wallboxAmpere: 'AC',
        wallboxPower: 'AC',
        wallboxWh: 'AC',
    };
    return fixedByKey[String(item.key || '')] || '';
}

function requiredSettingsComplete(assignments) {
    const items = Array.isArray(assignments) ? assignments : [];
    if (!items.length) {
        return false;
    }
    return items.every(item => item.required !== true || String(item.stateId || '').trim().length > 0);
}

function isDemoAccountToken(value) {
    const token = String(value || '')
        .trim()
        .toUpperCase();
    return ['DEMOACCOUNT', 'DEMOACC'].some(prefix => token === prefix || token.startsWith(`${prefix}-`));
}

function customScriptStatePathWarning(stateId) {
    const normalized = String(stateId || '')
        .trim()
        .toLowerCase();
    return normalized.startsWith('0_userdata.') || normalized.startsWith('javascript.');
}

function displayDatapointKey(key) {
    const aliases = {
        consumptionWh: 'consumption',
        gridExportMeterWh: 'gridExportMeter',
        wallboxWh: 'wallbox',
    };
    return aliases[key] || key || '';
}

function formatErrors(result) {
    return result?.errors?.length ? t('errorPrefix', result.errors.join(', ')) : t('errorUnknown');
}

function normalizeStateList(states) {
    return (Array.isArray(states) ? states : [])
        .map(state => {
            const id = String(state?.id || '').trim();
            if (!id) {
                return null;
            }
            return {
                id,
                name: localizedObjectName(state.name) || id,
                role: String(state.role || ''),
                type: String(state.type || ''),
                value: state.value,
            };
        })
        .filter(Boolean)
        .sort((left, right) => left.id.localeCompare(right.id));
}

function buildStateTree(states, filter) {
    const normalizedFilter = String(filter || '')
        .trim()
        .toLowerCase();
    const words = normalizedFilter.split(/\s+/u).filter(Boolean);
    const root = createTreeNode('', '');
    const stateById = new Map();
    const matchAncestorIds = new Set();

    for (const state of states) {
        const haystack = `${state.id} ${state.name} ${state.role} ${state.type} ${state.value ?? ''}`.toLowerCase();
        if (words.length && !words.every(word => haystack.includes(word))) {
            continue;
        }

        const parts = state.id.split('.').filter(Boolean);
        let current = root;
        let path = '';
        for (const [index, part] of parts.entries()) {
            path = path ? `${path}.${part}` : part;
            let child = current.childrenById.get(path);
            if (!child) {
                child = createTreeNode(path, part);
                current.childrenById.set(path, child);
                current.children.push(child);
            }
            if (index === parts.length - 1) {
                child.state = state;
                child.label = state.name && state.name !== state.id ? state.name : part;
                stateById.set(state.id, state);
                for (const ancestorId of getStateAncestorIds(state.id)) {
                    matchAncestorIds.add(ancestorId);
                }
            }
            current = child;
        }
    }

    sortTreeNodes(root.children);
    return {
        matchAncestorIds,
        nodes: root.children,
        stateById,
    };
}

function createTreeNode(id, label) {
    return {
        children: [],
        childrenById: new Map(),
        id,
        label,
        state: null,
    };
}

function sortTreeNodes(nodes) {
    nodes.sort((left, right) => {
        if (Boolean(left.state) !== Boolean(right.state)) {
            return left.state ? 1 : -1;
        }
        return left.label.localeCompare(right.label, undefined, { numeric: true, sensitivity: 'base' });
    });
    for (const node of nodes) {
        sortTreeNodes(node.children);
        delete node.childrenById;
    }
}

function getStateAncestorIds(stateId) {
    const parts = String(stateId || '')
        .split('.')
        .filter(Boolean);
    return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join('.'));
}

function canSendToAdapter(adminSocket) {
    return Boolean(adminSocket?.sendTo || window.sendTo);
}

function localizedObjectName(name) {
    if (!name || typeof name !== 'object') {
        return String(name || '');
    }
    return name[i18n.getLanguage()] || name.en || name.de || Object.values(name).find(Boolean) || '';
}

function formatStateValue(value) {
    if (value === null || value === undefined || value === '') {
        return '-';
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return String(value);
}

function isErrorStatus(value) {
    return /fehler|failed|error|unauthorized|forbidden|authentication/i.test(String(value || ''));
}

function useUiUpdateAvailable() {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        let active = true;
        async function checkForUpdate() {
            const latestAsset = await fetchLatestUiAsset();
            if (!active || !latestAsset) {
                return;
            }
            setUpdateAvailable(latestAsset !== CURRENT_UI_ASSET);
        }

        checkForUpdate();
        const interval = window.setInterval(checkForUpdate, UI_UPDATE_CHECK_INTERVAL_MS);
        window.addEventListener('focus', checkForUpdate);
        return () => {
            active = false;
            window.clearInterval(interval);
            window.removeEventListener('focus', checkForUpdate);
        };
    }, []);

    return updateAvailable;
}

async function fetchLatestUiAsset() {
    try {
        const url = new URL(MANIFEST_URL.href);
        url.searchParams.set('_', String(Date.now()));
        const response = await fetch(url.href, { cache: 'no-store' });
        if (!response.ok) {
            return '';
        }
        const manifest = await response.json();
        const components = Array.isArray(manifest?.exposes)
            ? manifest.exposes.find(item => item?.name === 'Components')
            : null;
        const asset = components?.assets?.js?.sync?.find(item => /(^|\/)main-[^/]+\.js$/u.test(String(item || '')));
        return basename(asset);
    } catch {
        return '';
    }
}

async function reloadWithCacheBust() {
    await clearAdapterCacheEntries();
    const url = new URL(window.location.href);
    url.searchParams.set('aemReload', String(Date.now()));
    window.location.replace(url.href);
}

async function clearAdapterCacheEntries() {
    if (!('caches' in window)) {
        return;
    }
    try {
        const keys = await caches.keys();
        await Promise.all(
            keys
                .filter(key => /ai-energy-manager|ConfigCustomAiEnergyManager|iobroker/i.test(key))
                .map(key => caches.delete(key)),
        );
    } catch {
        // Browser cache clearing is best-effort. The cache-busting URL still forces
        // the admin page to resolve the latest uploaded assets.
    }
}

function formatDateTime(value) {
    if (!value) {
        return '-';
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString(adminLocale());
}

function formatDateTimeMinute(value) {
    if (!value) {
        return '-';
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? String(value)
        : date.toLocaleString(adminLocale(), {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          });
}

function formatTime(value) {
    if (!value) {
        return '-';
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? String(value)
        : date.toLocaleTimeString(adminLocale(), {
              hour: '2-digit',
              minute: '2-digit',
          });
}

function adminLocale() {
    const lang = String(window.sysLang || navigator.language || 'en').trim();
    const aliases = {
        'zh-cn': 'zh-CN',
    };
    return aliases[lang.toLowerCase()] || lang;
}

function formatTimeRange(from, to) {
    return `${formatTime(from)} - ${formatTime(to)}`;
}

function formatNumber(value, decimals) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toFixed(decimals) : '-';
}

function formatNullable(value, decimals) {
    return value === null || value === undefined ? '-' : formatNumber(value, decimals);
}

function actionClass(action) {
    return String(action || 'none').replace(/[^a-zA-Z0-9_-]/g, '_') || 'none';
}

function modeClass(slot) {
    return actionClass(slot.operatingMode || slot.action);
}

function detectThemeType({ fallbackToSystem = true } = {}) {
    const match = String(window.location.href).match(/[?&#]react=(dark|light)\b/i);
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
        window.localStorage?.getItem('App.theme'),
        window.localStorage?.getItem('App.themeName'),
        window.localStorage?.getItem('App.themeType'),
        window.localStorage?.getItem('theme'),
        window.localStorage?.getItem('themeType'),
    ];
    for (const value of candidates) {
        const normalized = String(value || '').toLowerCase();
        if (/\bdark\b|dark/i.test(normalized)) {
            return 'dark';
        }
        if (/\blight\b|blue/i.test(normalized)) {
            return 'light';
        }
    }
    if (!fallbackToSystem) {
        return '';
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function useObservedThemeType() {
    const [themeType, setThemeType] = useState(() => detectThemeType({ fallbackToSystem: false }));

    useEffect(() => {
        const update = () => {
            setThemeType(current => {
                const next = detectThemeType({ fallbackToSystem: false });
                return current === next ? current : next;
            });
        };
        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'data-theme-type', 'style'],
        });
        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'data-theme-type', 'style'],
            });
        }
        media?.addEventListener?.('change', update);
        window.addEventListener('storage', update);
        window.addEventListener('focus', update);
        const interval = window.setInterval(update, 1000);
        update();
        return () => {
            observer.disconnect();
            media?.removeEventListener?.('change', update);
            window.removeEventListener('storage', update);
            window.removeEventListener('focus', update);
            window.clearInterval(interval);
        };
    }, []);

    return themeType;
}

export class AemConfig extends React.Component {
    componentDidMount() {
        this.root = createReactMount(this.container);
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
                ref={element => {
                    this.container = element;
                }}
            />
        );
    }
}

export default { AemConfig };

if (window.aemStandaloneConfig) {
    createReactMount(document.getElementById('root')).render(<App />);
}

function createReactMount(container) {
    return {
        render(element) {
            ReactDOM.render(element, container);
        },
        unmount() {
            ReactDOM.unmountComponentAtNode?.(container);
        },
    };
}
