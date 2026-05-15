import "./virtual_mf-exposes___mfe_internal__ConfigCustomAiEnergyManager__customComponents_js-BcT3vSVQ.js";
import "./virtual_mf-REMOTE_ENTRY_ID___mfe_internal__ConfigCustomAiEnergyManager__customComponents_js-vjOATGUU.js";
import {
  A as e,
  F as t,
  I as n,
  N as r,
  V as i,
  v as a,
} from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-Z9kjHTfK.js";
import {
  A as o,
  C as s,
  D as c,
  E as l,
  F as u,
  M as d,
  N as f,
  O as p,
  P as m,
  R as h,
  S as g,
  T as ee,
  _,
  a as v,
  b as te,
  c as ne,
  d as re,
  f as ie,
  g as y,
  h as b,
  j as x,
  k as S,
  l as C,
  m as w,
  n as T,
  p as ae,
  t as oe,
  u as E,
  v as D,
  w as O,
  x as k,
  y as A,
  z as j,
} from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DbPfsCnh.js";
import { t as M } from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare__react_mf_2_dom_mf_1_client__loadShare__.mjs-BZ6R6Oj7.js";
i();
var N = {
    baseConfiguration: `Basis-Konfiguration`,
    backendUrl: `Backend-URL`,
    backendUrlHelp: `URL deines SmartEnergy Backends, zum Beispiel https://example.invalid`,
    adapterToken: `Adapter-Token`,
    adapterTokenHelp: `Token aus dem Webfrontend. Dieses Token wird nicht im Adapter-Code gespeichert und darf nicht veröffentlicht werden.`,
    requestConfig: `Konfiguration abrufen`,
    requestConfigHelp: `Ruft die aktuelle Anlagenkonfiguration manuell vom Server ab. Es gibt kein dauerhaftes Auto-Polling für diese Konfiguration.`,
    serverConfigLastRequest: `Letzter Konfigurationsabruf`,
    serverConfigInfo: `Nach Request Config werden die vom Server erkannten Bereiche sichtbar. Bereits ausgewählte Datenpunkte bleiben erhalten, sofern die Schlüssel gleich bleiben.`,
    operationConfiguration: `Betriebs-Konfiguration`,
    sendIntervalSeconds: `Intervall für Betriebsdaten in Sekunden`,
    commandPollIntervalSeconds: `Intervall für Steuerbefehle in Sekunden`,
    sendOnlyChanged: `Nur senden, wenn sich Werte geändert haben`,
    minWriteIntervalSeconds: `Mindestabstand zwischen Schreibbefehlen in Sekunden`,
    battery: `Batteriespeicher`,
    batterySoc: `Batterie SOC`,
    batteryPower: `Batterie Lade-/Entladeleistung`,
    batteryMode: `Batterie Modus`,
    batteryReserveSoc: `Batterie Mindest-SOC / Reserve`,
    gridMeter: `Netzzähler`,
    gridPower: `Netzleistung`,
    gridTotalPower: `Gesamtleistung Netz`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox Leistung`,
    wallboxCarState: `Wallbox Fahrzeugstatus`,
    wallboxAmpere: `Wallbox Ladestrom`,
    allowCharging: `Ladefreigabe`,
    wallboxUser: `Wallbox User / RFID`,
    pvForecast: `PV-Prognose`,
    pvForecastDatapoint: `PV-Prognose Datenpunkt`,
    pvPower: `PV-Leistung real`,
    pvDailyYield: `PV Tagesertrag`,
    storageSystem: `Speichersystem`,
    storageSystemSoc: `Speicher SOC`,
    storageSystemBatteryPower: `Speicherleistung`,
    storageSystemPvPower: `PV-Leistung`,
    storageSystemMode: `Speicher Betriebsmodus`,
    energyMeter: `Energiezähler`,
    energyMeterPower: `Zähler Verbrauch`,
    energyMeterReading: `Zählerstand`,
    batterySocHelp: `Aktueller Ladezustand der Batterie in Prozent`,
    batteryPowerHelp: `Aktuelle Lade- oder Entladeleistung der Batterie. Vorzeichen wie im Datenpunkt vorhanden auswählen.`,
    batteryModeHelp: `Optionaler Modus-Datenpunkt des Speichers`,
    batteryReserveSocHelp: `Optionaler schreibbarer Reserve- oder Mindest-SOC-Datenpunkt`,
    consumptionWh: `Verbrauch`,
    gridExportMeterWh: `Einspeisung`,
    consumptionWhHelp: `Optionaler Energiezähler für Netzbezug`,
    gridExportMeterWhHelp: `Optionaler Energiezähler für Netzeinspeisung`,
    gridPowerHelp: `Aktueller Momentanwert des Netzzählers in Watt. Erwartet wird die aktuelle Leistung am Netzanschlusspunkt, typischerweise positiv bei Netzbezug und negativ bei Einspeisung.`,
    gridTotalPowerHelp: `Optionaler Gesamtleistungs-Datenpunkt`,
    wallboxWhHelp: `Optionaler Datenpunkt für die geladene E-Auto-Energie`,
    wallboxPowerHelp: `Aktuelle Ladeleistung der Wallbox`,
    wallboxCarStateHelp: `Status, ob Fahrzeug verbunden oder ladend ist`,
    wallboxAmpereHelp: `Schreibbarer Ladestrom der Wallbox`,
    allowChargingHelp: `Optionaler Datenpunkt zur Ladefreigabe`,
    wallboxUserHelp: `Optionaler User- oder RFID-Datenpunkt`,
    pvForecastHelp: `Prognosewert der PV-Anlage aus dem gewählten Datenpunkt`,
    pvPowerHelp: `Aktuelle reale PV-Leistung`,
    pvDailyYieldHelp: `Optionaler Tagesertrag der PV-Anlage`,
    storageSystemSocHelp: `Aktueller Ladezustand des Speichers`,
    storageSystemBatteryPowerHelp: `Aktuelle Leistungsrichtung des Speichersystems`,
    storageSystemPvPowerHelp: `Aktuelle PV-Leistung aus dem Speichersystem`,
    storageSystemModeHelp: `Optionaler schreibbarer Betriebsmodus`,
    energyMeterPowerHelp: `Aktuelle Verbrauchsleistung aus dem Energiezähler`,
    energyMeterReadingHelp: `Zähler- oder Energie-Datenpunkt aus dem Energiezähler`,
    connection: `Verbindung`,
    lastConfigRequest: `Letzter Config-Abruf`,
    openSmartEnergyPortal: `SmartEnergy Portal öffnen`,
    noAccountOrToken: `Noch kein Konto oder Adapter-Token?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Bitte zuerst im Settings-Tab einen gültigen Adapter-Token eintragen und Request Config ausführen.`,
    dashboardRequiredMissing: `Bitte im Settings-Tab alle Pflichtfelder zuordnen, bevor das Dashboard angezeigt wird.`,
    configLoading: `Konfiguration wird abgerufen ...`,
    configLoaded: `Konfiguration geladen.`,
    adapterNoResponse: `Fehler: Keine Antwort vom Adapter. Bitte prüfen, ob die Instanz läuft.`,
    adminConnectionUnavailable: `ioBroker Admin-Verbindung ist nicht verfügbar.`,
    objectSelectionUnavailable: `Objektauswahl nicht verfügbar.`,
    selectStatePathTitle: `ioBroker State-Path auswählen`,
    autoUpdated: `Automatisch aktualisiert: %s`,
    dashboardDataAsOf: `Datenstand: %s`,
    waitingForDashboardData: `Warte auf automatische Dashboard-Daten.`,
    noDashboardData: `Noch keine Dashboard-Daten geladen.`,
    noDatapointAssignments: `Noch keine Datenpunkt-Zuordnung vorhanden. Bitte Token speichern und Request Config ausführen.`,
    acDcInfo: `AC steht für Wechselstrom im Hausnetz, also typischen Hausstrom nach dem Wechselrichter. DC steht für Gleichstrom, zum Beispiel PV-Strom oder Batteriestrom vor dem Wechselrichter.`,
    value: `Wert`,
    type: `Typ`,
    unit: `Einheit`,
    required: `Pflicht`,
    selectStatePath: `State-Path auswählen`,
    customScriptStatePathWarning: `Hinweis: Dieser Datenpunkt liegt in einem Custom-Script-Ordner. Er wird akzeptiert, kann aber aufgrund des nicht offiziellen Adapterpfads falsche oder fehlerhafte Werte enthalten.`,
    showInfo: `Info anzeigen`,
    generalValues: `Allgemeine Werte:`,
    plantTitle: `Anlage %s:`,
    household: `Haushalt`,
    plant: `Anlage`,
    sixHourPlan: `10-Stunden-Plan`,
    noSixHourPlan: `Noch kein 10-Stunden-Plan vorhanden.`,
    patternDetection: `Mustererkennung`,
    activeLoadProfile: `Aktives Lastprofil`,
    profileForecast: `Profil-Prognose`,
    baseLoadProfile: `Grundlastprofil`,
    todayProjected: `Heute hochgerechnet`,
    profile: `Profil`,
    days: `Tage`,
    averageConsumption: `Ø Verbrauch`,
    range: `Bereich`,
    confidence: `Confidence`,
    technicalAction: `technisch: %s`,
    errorUnknown: `Fehler: Unbekannter Fehler`,
    errorPrefix: `Fehler: %s`,
    dashboardBatteryCapacity: `Batteriekapazität`,
    dashboardConsumptionForecast: `Verbrauchsprognose`,
    dashboardPvForecast: `PV-Prognose`,
    dashboardEnergyGapNext24h: `Versorgungslücke inkl. Reserve`,
    dashboardRecommendation: `Empfehlung`,
    dashboardGridChargingPlanned: `Netzladen geplant`,
    yes: `Ja`,
    no: `Nein`,
    gridOperation: `Netzbetrieb`,
    pvBatteryOperation: `PV/Batterie-Betrieb`,
    insufficientData: `Unzureichende Daten`,
    chargeBattery: `Batterie laden`,
    holdBattery: `Batterie halten`,
    useBattery: `Batterie nutzen`,
    noControl: `Keine Steuerung`,
    householdLoadFromGridBatteryCharging: `Hausverbrauch aus Netz, Batterie wird geladen`,
    householdLoadFromGridBatteryChargedBriefly: `Hausverbrauch aus Netz, Batterie wird kurzfristig geladen`,
    householdLoadFromGridPvBatteryHeld: `Hausverbrauch aus Netz/PV, Batterie wird gehalten`,
    pvBatteryCoverConsumption: `PV und Batterie decken den Verbrauch, Netzladung ist nicht geplant`,
    pvPreferred: `PV wird bevorzugt genutzt`,
    avoidGridImport: `Netzbezug vermeiden`,
    noActiveGridCharging: `Keine aktive Netzladung`,
    noReliableDecision: `Keine verlässliche Entscheidung`,
    gridPowerEconomical: `Netzstrom ist laut Berechnung wirtschaftlich oder notwendig.`,
    batteryReservePreserved: `Batteriereserve wird geschont, bis PV-Ertrag oder ein Ladefenster erreicht ist.`,
    batteryPvSufficient: `Vorhandene Batterieenergie und erwarteter PV-Ertrag reichen aus.`,
    pvCoversConsumptionAndBattery: `PV-Ertrag wird genutzt, um Verbrauch und Batterie zu decken.`,
    batterySupportsHousehold: `Batterie darf den Hausverbrauch stützen.`,
    noGridChargingNeed: `Kein Netzladebedarf erkannt.`,
    telemetryInsufficient: `Telemetrie, Prognose oder Backend-Daten reichen für eine Entscheidung nicht aus.`,
    gridCharging: `Netzladen`,
    usePv: `PV nutzen`,
    doNotCharge: `Nicht laden`,
    hold: `Halten`,
    discharge: `Entladen`,
    chargeFromPv: `PV laden`,
    noAction: `Keine Aktion`,
    forecastPending: `Prognose ausstehend`,
    noPlanning: `Keine Planung`,
    requiredForecastPending: `Benötigte Prognosedaten stehen noch aus`,
    planningWindowContinues: `Das Planungsfenster läuft weiter, sobald alle benötigten Prognosedaten verfügbar sind.`,
  },
  P = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  se = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  F = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  I = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  ce = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  le = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  L = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  ue = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  R = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  de = {
    baseConfiguration: `Base configuration`,
    backendUrl: `Backend URL`,
    backendUrlHelp: `URL of your SmartEnergy backend, for example https://example.invalid`,
    adapterToken: `Adapter token`,
    adapterTokenHelp: `Token from the web frontend. This token is not stored in adapter code and must never be published.`,
    requestConfig: `Request Config`,
    requestConfigHelp: `Manually requests the current plant configuration from the server. There is no permanent auto polling for this configuration.`,
    serverConfigLastRequest: `Last config request`,
    serverConfigInfo: `After Request Config, the areas detected by the server become visible. Existing datapoint selections are preserved as long as the keys remain unchanged.`,
    operationConfiguration: `Operation configuration`,
    sendIntervalSeconds: `State payload interval in seconds`,
    commandPollIntervalSeconds: `Control command interval in seconds`,
    sendOnlyChanged: `Send only when values changed`,
    minWriteIntervalSeconds: `Minimum distance between write commands in seconds`,
    battery: `Battery storage`,
    batterySoc: `Battery SOC`,
    batteryPower: `Battery charge/discharge power`,
    batteryMode: `Battery mode`,
    batteryReserveSoc: `Battery minimum SOC / reserve`,
    gridMeter: `Grid meter`,
    gridPower: `Grid meter value`,
    gridTotalPower: `Grid total power`,
    wallbox: `Wallbox`,
    wallboxPower: `Wallbox power`,
    wallboxCarState: `Wallbox car state`,
    wallboxAmpere: `Wallbox current`,
    allowCharging: `Charging permission`,
    wallboxUser: `Wallbox user / RFID`,
    pvForecast: `PV forecast`,
    pvForecastDatapoint: `PV forecast datapoint`,
    pvPower: `Real PV power`,
    pvDailyYield: `PV daily yield`,
    storageSystem: `Storage system`,
    storageSystemSoc: `Storage SOC`,
    storageSystemBatteryPower: `Storage power`,
    storageSystemPvPower: `PV power`,
    storageSystemMode: `Storage operating mode`,
    energyMeter: `Energy meter`,
    energyMeterPower: `Meter consumption`,
    energyMeterReading: `Meter reading`,
    batterySocHelp: `Current battery state of charge in percent`,
    batteryPowerHelp: `Current battery charge or discharge power. Select the sign convention used by the source datapoint.`,
    batteryModeHelp: `Optional storage mode datapoint`,
    batteryReserveSocHelp: `Optional writable reserve or minimum SOC datapoint`,
    consumptionWh: `Consumption`,
    gridExportMeterWh: `Feed-in`,
    consumptionWhHelp: `Optional energy meter for grid import`,
    gridExportMeterWhHelp: `Optional energy meter for grid export`,
    gridPowerHelp: `Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.`,
    gridTotalPowerHelp: `Optional total grid power datapoint`,
    wallboxWhHelp: `Optional datapoint for charged EV energy`,
    wallboxPowerHelp: `Current wallbox charging power`,
    wallboxCarStateHelp: `State indicating whether a vehicle is connected or charging`,
    wallboxAmpereHelp: `Writable wallbox charging current`,
    allowChargingHelp: `Optional datapoint for charging permission`,
    wallboxUserHelp: `Optional user or RFID datapoint`,
    pvForecastHelp: `Forecast value of the PV system from the selected datapoint`,
    pvPowerHelp: `Current real PV power`,
    pvDailyYieldHelp: `Optional daily yield of the PV system`,
    storageSystemSocHelp: `Current storage state of charge`,
    storageSystemBatteryPowerHelp: `Current power direction of the storage system`,
    storageSystemPvPowerHelp: `Current PV power from the storage system`,
    storageSystemModeHelp: `Optional writable operating mode`,
    energyMeterPowerHelp: `Current consumption power from the energy meter`,
    energyMeterReadingHelp: `Meter reading or energy datapoint from the energy meter`,
    connection: `Connection`,
    lastConfigRequest: `Last config request`,
    openSmartEnergyPortal: `Open SmartEnergy portal`,
    noAccountOrToken: `No account or adapter token yet?`,
    dashboard: `Dashboard`,
    settings: `Settings`,
    settingsTokenMissing: `Please first enter a valid adapter token in the Settings tab and run Request Config.`,
    dashboardRequiredMissing: `Please assign all required fields in the Settings tab before the dashboard is shown.`,
    configLoading: `Loading configuration ...`,
    configLoaded: `Configuration loaded.`,
    adapterNoResponse: `Error: no response from the adapter. Please check whether the instance is running.`,
    adminConnectionUnavailable: `ioBroker admin connection is not available.`,
    objectSelectionUnavailable: `Object selection is not available.`,
    selectStatePathTitle: `Select ioBroker state path`,
    autoUpdated: `Automatically updated: %s`,
    dashboardDataAsOf: `Data as of: %s`,
    waitingForDashboardData: `Waiting for automatic dashboard data.`,
    noDashboardData: `No dashboard data loaded yet.`,
    noDatapointAssignments: `No datapoint assignment available yet. Please save the token and run Request Config.`,
    acDcInfo: `AC means alternating current in the home grid, typically household power after the inverter. DC means direct current, for example PV power or battery power before the inverter.`,
    value: `Value`,
    type: `Type`,
    unit: `Unit`,
    required: `Required`,
    selectStatePath: `Select state path`,
    customScriptStatePathWarning: `Notice: This datapoint is located in a custom script folder (0_userdata. or javascript.). It is accepted, but may contain incorrect or faulty values because it is not an official adapter path.`,
    showInfo: `Show info`,
    generalValues: `General values:`,
    plantTitle: `Plant %s:`,
    household: `Household`,
    plant: `Plant`,
    sixHourPlan: `10-hour plan`,
    noSixHourPlan: `No 10-hour plan available yet.`,
    patternDetection: `Pattern detection`,
    activeLoadProfile: `Active load profile`,
    profileForecast: `Profile forecast`,
    baseLoadProfile: `Base load profile`,
    todayProjected: `Today projected`,
    profile: `Profile`,
    days: `Days`,
    averageConsumption: `Average consumption`,
    range: `Range`,
    confidence: `Confidence`,
    technicalAction: `technical: %s`,
    errorUnknown: `Error: unknown error`,
    errorPrefix: `Error: %s`,
    dashboardBatteryCapacity: `Battery capacity`,
    dashboardConsumptionForecast: `Consumption forecast`,
    dashboardPvForecast: `PV forecast`,
    dashboardEnergyGapNext24h: `Energy gap incl. reserve`,
    dashboardRecommendation: `Recommendation`,
    dashboardGridChargingPlanned: `Grid charging planned`,
    yes: `Yes`,
    no: `No`,
    gridOperation: `Grid operation`,
    pvBatteryOperation: `PV/battery operation`,
    insufficientData: `Insufficient data`,
    chargeBattery: `Charge battery`,
    holdBattery: `Hold battery`,
    useBattery: `Use battery`,
    noControl: `No control`,
    householdLoadFromGridBatteryCharging: `Household load from grid, battery is charging`,
    householdLoadFromGridBatteryChargedBriefly: `Household load from grid, battery is charged briefly`,
    householdLoadFromGridPvBatteryHeld: `Household load from grid/PV, battery is held`,
    pvBatteryCoverConsumption: `PV and battery cover consumption, grid charging is not planned`,
    pvPreferred: `PV is preferred`,
    avoidGridImport: `Avoid grid import`,
    noActiveGridCharging: `No active grid charging`,
    noReliableDecision: `No reliable decision`,
    gridPowerEconomical: `Grid power is economical or necessary according to the calculation.`,
    batteryReservePreserved: `Battery reserve is preserved until PV yield or a charging window is reached.`,
    batteryPvSufficient: `Available battery energy and expected PV yield are sufficient.`,
    pvCoversConsumptionAndBattery: `PV yield is used to cover consumption and battery.`,
    batterySupportsHousehold: `Battery may support household consumption.`,
    noGridChargingNeed: `No grid charging need detected.`,
    telemetryInsufficient: `Telemetry, forecast or backend data are not sufficient for a decision.`,
    gridCharging: `Grid charging`,
    usePv: `Use PV`,
    doNotCharge: `Do not charge`,
    hold: `Hold`,
    discharge: `Discharge`,
    chargeFromPv: `Charge from PV`,
    noAction: `No action`,
    forecastPending: `Forecast pending`,
    noPlanning: `No planning`,
    requiredForecastPending: `Required forecast data is still pending`,
    planningWindowContinues: `The planning window continues once all required forecast data is available.`,
  },
  fe = 2e4,
  pe = [
    [`grid_operation`, `gridOperation`],
    [`pv_battery_operation`, `pvBatteryOperation`],
    [`forecast_pending`, `forecastPending`],
    [`insufficient_data`, `insufficientData`],
  ],
  z = 40,
  me = 5e3,
  B = new Set([
    `de`,
    `en`,
    `es`,
    `fr`,
    `it`,
    `nl`,
    `pl`,
    `pt`,
    `ru`,
    `uk`,
    `zh-cn`,
  ]),
  he = {
    de: N,
    en: P,
    es: se,
    fr: F,
    it: I,
    nl: ce,
    pl: le,
    pt: L,
    ru: ue,
    uk: R,
    "zh-cn": de,
  };
(T.setTranslations(v),
  ge(),
  T.setLanguage(H(window.sysLang || window.systemLang || `en`)));
function V(e, ...t) {
  return T.t(e, ...t);
}
function H(e) {
  let t = String(e || ``)
    .trim()
    .toLowerCase();
  if (!t) return `en`;
  if (t.startsWith(`zh`)) return `zh-cn`;
  let n = t.slice(0, 2);
  return B.has(t) ? t : B.has(n) ? n : `en`;
}
function ge() {
  T.extendTranslations(he);
}
function _e(t, r) {
  let [i, a] = n(() =>
    H(
      r ||
        (t == null ? void 0 : t.systemLang) ||
        window.sysLang ||
        window.systemLang ||
        T.getLanguage(),
    ),
  );
  return (
    e(() => {
      let e = !0,
        n = H(
          r ||
            (t == null ? void 0 : t.systemLang) ||
            window.sysLang ||
            window.systemLang ||
            T.getLanguage(),
        );
      return (
        a(n),
        t != null &&
          t.getObject &&
          t
            .getObject(`system.config`)
            .then((r) => {
              var i;
              e &&
                a(
                  H(
                    (r == null || (i = r.common) == null
                      ? void 0
                      : i.language) ||
                      (t == null ? void 0 : t.systemLang) ||
                      n,
                  ),
                );
            })
            .catch(() => {}),
        () => {
          e = !1;
        }
      );
    }, [r, t]),
    ge(),
    T.setLanguage(i),
    i
  );
}
var U = {
    adapterToken: ``,
    serverConfigLastRequest: ``,
    datapointAssignments: [],
    dashboardLite: null,
  },
  W = { ...U },
  G = () => {},
  K = null,
  ve = null,
  ye = ``;
function q(e) {
  return JSON.parse(JSON.stringify(e ?? null));
}
function be() {
  G();
}
function xe(e) {
  let t = q(e) || {};
  return (delete t.dashboardLite, delete t.dashboardLiteLastRequest, t);
}
function Se(e) {
  e(xe(W));
}
window.aemStandaloneConfig &&
  ((window.load = (e, t) => {
    let n = q(e) || {};
    ((W = {
      ...U,
      ...n,
      dashboardLite: n.dashboardLite || ve,
      dashboardLiteLastRequest: n.dashboardLiteLastRequest || ye,
    }),
      (G = typeof t == `function` ? t : () => {}),
      K == null || K(W),
      G(!1));
  }),
  (window.save = Se));
function Ce({
  adminSocket: i = null,
  adminTheme: a = null,
  adminThemeType: o = ``,
  adminLanguage: c = ``,
  adapterName: d = `ai-energy-manager`,
  configData: f = null,
  instance: p = 0,
  onConfigChange: g = null,
} = {}) {
  var _, v, re, y;
  _e(i, c);
  let b = typeof g == `function`,
    [x, S] = n(() => ({ ...U, ...(q(f) || W) })),
    [C, w] = n(0),
    [T, E] = n(``),
    [D, k] = n(``),
    [A, M] = n(!1),
    [N, P] = n(null),
    se = nt(),
    F = t(x);
  K = (e) => {
    b || S({ ...e });
  };
  let I =
      se ||
      o ||
      (a == null || (_ = a.palette) == null ? void 0 : _.mode) ||
      tt({ fallbackToSystem: !0 }),
    ce =
      (a == null || (v = a.palette) == null ? void 0 : v.mode) === I ? a : null,
    le = r(
      () =>
        ce ||
        l({
          palette: {
            mode: I,
            primary: { main: `#1976d2` },
            secondary: { main: `#2e7d32` },
            background:
              I === `dark`
                ? { default: `#101418`, paper: `#171d22` }
                : { default: `#f5f7fa`, paper: `#ffffff` },
          },
          shape: { borderRadius: 6 },
        }),
      [ce, I],
    );
  (e(() => {
    F.current = x;
  }, [x]),
    e(() => {
      if (!b) return;
      let e = {
        ...U,
        ...(q(f) || {}),
        dashboardLite: F.current.dashboardLite || ve,
        dashboardLiteLastRequest: F.current.dashboardLiteLastRequest || ye,
      };
      ((W = e), (F.current = e), S(e));
    }, [f, b]));
  function L(e, t = !0) {
    let n = typeof e == `function` ? e(q(F.current)) : e;
    ((W = { ...U, ...(n || {}) }),
      (F.current = W),
      S(W),
      t && (b ? g(xe(W)) : be()));
  }
  function ue(e, t) {
    L((n) => ({ ...n, [e]: t }));
  }
  function R(e, t, n) {
    if (i != null && i.sendTo) {
      i.sendTo(`${d}.${p}`, e, t)
        .then((e) => n(e))
        .catch((e) =>
          n({
            ok: !1,
            errors: [(e == null ? void 0 : e.message) || String(e)],
          }),
        );
      return;
    }
    if (window.sendTo) {
      window.sendTo(null, e, t, n);
      return;
    }
    n({ ok: !1, errors: [V(`adminConnectionUnavailable`)] });
  }
  function de() {
    let e = String(x.adapterToken || ``).trim();
    if (!e) return;
    let t = !1,
      n = window.setTimeout(() => {
        t || ((t = !0), M(!1), E(V(`adapterNoResponse`)));
      }, fe);
    (M(!0),
      E(V(`configLoading`)),
      R(`requestConfig`, { source: `admin`, adapterToken: e }, (e) => {
        if (!t) {
          if (((t = !0), window.clearTimeout(n), M(!1), !e || e.ok === !1)) {
            E(Ke(e));
            return;
          }
          (L((t) => ({
            ...t,
            serverConfig: e.serverConfig || t.serverConfig,
            serverConfigLastRequest: e.serverConfigLastRequest || ``,
            datapointAssignments:
              e.datapointAssignments || t.datapointAssignments || [],
          })),
            E(V(`configLoaded`)));
        }
      }));
  }
  function pe(e) {
    if (!e || e.ok === !1 || !e.serverConfig) return;
    let t = String(e.serverConfigLastRequest || ``);
    L(
      (n) => ({
        ...n,
        serverConfig: e.serverConfig,
        serverConfigLastRequest: t,
        datapointAssignments:
          e.datapointAssignments || n.datapointAssignments || [],
      }),
      !1,
    );
  }
  e(() => {
    if (!(i != null && i.sendTo) && !window.sendTo) return;
    let e = !0;
    function t() {
      R(`readServerConfigState`, {}, (t) => {
        e && pe(t);
      });
    }
    function n(t = !1) {
      R(`readDashboardLiteState`, { refresh: t }, (t) => {
        if (e) {
          if (!t || t.ok === !1) {
            k(Ke(t));
            return;
          }
          (t.dashboardLite &&
            ((ve = t.dashboardLite), (ye = t.dashboardLiteLastRequest || ``)),
            L(
              (e) => ({
                ...e,
                dashboardLite: t.dashboardLite || e.dashboardLite || null,
                dashboardLiteLastRequest:
                  t.dashboardLiteLastRequest ||
                  e.dashboardLiteLastRequest ||
                  ``,
              }),
              !1,
            ),
            k(
              t.dashboardLiteLastRequest
                ? V(`autoUpdated`, Je(t.dashboardLiteLastRequest))
                : V(`waitingForDashboardData`),
            ));
        }
      });
    }
    (t(), n(!0));
    let r = window.setInterval(() => n(!1), 15e3);
    return () => {
      ((e = !1), window.clearInterval(r));
    };
  }, []);
  function z(e, t) {
    L((n) => {
      let r = Array.isArray(n.datapointAssignments)
        ? [...n.datapointAssignments]
        : [];
      return (
        (r[e] = { ...(r[e] || {}), ...t }),
        { ...n, datapointAssignments: r }
      );
    });
  }
  async function me(e) {
    var t;
    let n =
      ((t = x.datapointAssignments) == null || (t = t[e]) == null
        ? void 0
        : t.stateId) || ``;
    if (i != null && i.sendTo) {
      P(e);
      return;
    }
    try {
      var r, a;
      let t = await ((r = (a = window).aemSelectStatePath) == null
        ? void 0
        : r.call(a, n));
      t && z(e, { stateId: t });
    } catch (e) {
      E((e == null ? void 0 : e.message) || V(`objectSelectionUnavailable`));
    }
  }
  let B = String(x.adapterToken || ``).trim().length > 0,
    he = B && ((re = x.serverConfig) == null ? void 0 : re.valid) === !0,
    H = Ue(x.datapointAssignments || []);
  return j(ee, {
    theme: le,
    children: [
      h(O, {
        className: `aem-root${b ? ` aem-root-embedded` : ``}`,
        children: h(m, {
          className: `aem-shell`,
          elevation: 0,
          children: j(u, {
            spacing: 2,
            children: [
              h(u, {
                direction: { xs: `column`, md: `row` },
                justifyContent: `space-between`,
                gap: 1,
                children: j(O, {
                  children: [
                    h(s, {
                      variant: `h6`,
                      component: `h1`,
                      children: `AI Energy Manager`,
                    }),
                    j(s, {
                      variant: `body2`,
                      color: `text.secondary`,
                      children: [
                        V(`noAccountOrToken`),
                        ` `,
                        h(`a`, {
                          href: `https://smartenergy.mr-bond.de`,
                          target: `_blank`,
                          rel: `noreferrer`,
                          children: V(`openSmartEnergyPortal`),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              j(te, {
                value: C,
                onChange: (e, t) => w(t),
                children: [
                  h(ae, {
                    icon: h(ie, {}),
                    iconPosition: `start`,
                    label: V(`dashboard`),
                  }),
                  h(ae, {
                    icon: h(ne, {}),
                    iconPosition: `start`,
                    label: V(`settings`),
                  }),
                ],
              }),
              C === 0
                ? h(we, {
                    dashboardStatus: D,
                    hasRequiredSettings: H,
                    hasValidToken: he,
                    settings: x,
                  })
                : h(Te, {
                    assignments: x.datapointAssignments || [],
                    busyConfig: A,
                    hasToken: B,
                    requestConfig: de,
                    requestStatus: T,
                    selectStatePath: me,
                    settings: x,
                    setField: ue,
                    updateAssignment: z,
                  }),
            ],
          }),
        }),
      }),
      i != null && i.sendTo && N !== null
        ? h(oe, {
            columns: [`name`, `type`, `role`, `val`],
            onClose: () => P(null),
            onOk: (e) => {
              (typeof e == `string` && e && z(N, { stateId: e }), P(null));
            },
            selected:
              ((y = x.datapointAssignments) == null || (y = y[N]) == null
                ? void 0
                : y.stateId) || ``,
            socket: i,
            theme: le,
            themeType: I,
            title: V(`selectStatePathTitle`),
            types: `state`,
          })
        : null,
    ],
  });
}
function we({
  dashboardStatus: e,
  hasRequiredSettings: t,
  hasValidToken: n,
  settings: r,
}) {
  return n
    ? t
      ? j(u, {
          spacing: 2,
          children: [
            e && qe(e) ? h(o, { severity: `error`, children: e }) : null,
            h(Ee, {
              dashboard: r.dashboardLite,
              lastRequest: r.dashboardLiteLastRequest,
            }),
          ],
        })
      : h(o, { severity: `warning`, children: V(`dashboardRequiredMissing`) })
    : h(o, { severity: `warning`, children: V(`settingsTokenMissing`) });
}
function Te({
  assignments: e,
  busyConfig: t,
  hasToken: n,
  requestConfig: r,
  requestStatus: i,
  selectStatePath: a,
  settings: s,
  setField: l,
  updateAssignment: d,
}) {
  return j(u, {
    spacing: 2,
    children: [
      j(J, {
        title: V(`connection`),
        children: [
          j(O, {
            className: `settings-field-grid`,
            children: [
              h(k, {
                label: V(`adapterToken`),
                type: `password`,
                value: s.adapterToken || ``,
                onChange: (e) => l(`adapterToken`, e.target.value),
                autoComplete: `off`,
                fullWidth: !0,
              }),
              h(k, {
                label: V(`lastConfigRequest`),
                value: Je(s.serverConfigLastRequest),
                InputProps: { readOnly: !0 },
                fullWidth: !0,
              }),
            ],
          }),
          h(u, {
            direction: { xs: `column`, sm: `row` },
            gap: 1,
            sx: { mt: 2 },
            children: h(c, {
              variant: `contained`,
              disabled: !n || t,
              startIcon: h(E, {}),
              onClick: r,
              children: `Request Config`,
            }),
          }),
          i ? h(o, { severity: qe(i) ? `error` : `info`, children: i }) : null,
        ],
      }),
      h(ke, { assignments: e, selectStatePath: a, updateAssignment: d }),
      h(o, { severity: `info`, children: V(`acDcInfo`) }),
    ],
  });
}
function Ee({ dashboard: e, lastRequest: t }) {
  if (!e) return h(je, { text: V(`noDashboardData`) });
  let n = e.decisionTime || t || ``;
  return j(u, {
    spacing: 2,
    children: [
      j(J, {
        title: `Dashboard`,
        titleAction: n
          ? h(s, {
              variant: `caption`,
              color: `text.secondary`,
              children: V(`dashboardDataAsOf`, Ye(n)),
            })
          : null,
        children: [
          h(O, {
            className: `card-grid`,
            children: (e.cards || []).map((e, t) =>
              j(
                m,
                {
                  className: `metric-card`,
                  children: [
                    j(s, {
                      variant: `h6`,
                      children: [
                        Le(e),
                        e.unit ? j(`span`, { children: [` `, e.unit] }) : null,
                      ],
                    }),
                    h(s, {
                      variant: `caption`,
                      color: `text.secondary`,
                      children: X(e.label || ``),
                    }),
                  ],
                },
                `${e.label || `card`}-${t}`,
              ),
            ),
          }),
          e.reason
            ? h(s, {
                variant: `body2`,
                color: `text.secondary`,
                children: X(e.reason),
              })
            : null,
        ],
      }),
      h(J, {
        title: V(`sixHourPlan`),
        children: h(De, { plan: e.plan || [] }),
      }),
      h(J, {
        title: V(`patternDetection`),
        children: h(Oe, { pattern: e.pattern || {} }),
      }),
    ],
  });
}
function J({ children: e, title: t, titleAction: n = null }) {
  return j(m, {
    className: `section`,
    elevation: 0,
    children: [
      j(O, {
        className: `section-title-row`,
        children: [
          h(s, { variant: `subtitle1`, component: `h2`, children: t }),
          n ? h(O, { className: `section-title-action`, children: n }) : null,
        ],
      }),
      e,
    ],
  });
}
function De({ plan: e }) {
  if (!e.length) return h(je, { text: V(`noSixHourPlan`) });
  let t = e.slice(0, z);
  return j(u, {
    spacing: 1.5,
    children: [
      h(O, {
        className: `plan-timeline`,
        "aria-label": V(`sixHourPlan`),
        children: t.map((e, t) =>
          h(
            g,
            {
              title: `${Ze(e.from, e.to)} · ${X(e.operatingModeLabel || e.actionLabel || `-`)} · ${X(e.batteryCommand || `-`)} · ${X(e.gridBehavior || `-`)} · ${Q(e.plannedPowerW, 0)} W · ${Q(e.plannedEnergyKwh, 2)} kWh${e.technicalActionLabel ? ` · ${V(`technicalAction`, X(e.technicalActionLabel))}` : ``}${e.reason ? ` · ${X(e.reason)}` : ``}`,
              children: j(O, {
                className: `plan-slot mode-border-${et(e)}`,
                tabIndex: 0,
                children: [
                  h(s, {
                    variant: `caption`,
                    color: `text.secondary`,
                    children: Ze(e.from, e.to),
                  }),
                  h(s, {
                    variant: `body2`,
                    className: `plan-slot-action`,
                    noWrap: !0,
                    children: X(e.operatingModeLabel || e.actionLabel || `-`),
                  }),
                  h(s, {
                    variant: `caption`,
                    className: `plan-slot-command`,
                    noWrap: !0,
                    children: X(e.batteryCommand || `-`),
                  }),
                  j(s, {
                    variant: `caption`,
                    color: `text.secondary`,
                    children: [
                      Q(e.plannedPowerW, 0),
                      ` W`,
                      ` · `,
                      Q(e.plannedEnergyKwh, 2),
                      ` kWh`,
                    ],
                  }),
                ],
              }),
            },
            `${e.from || t}-${e.action || `none`}`,
          ),
        ),
      }),
      h(O, {
        className: `plan-legend`,
        children: pe.map(([e, t]) =>
          j(
            `span`,
            { children: [h(`i`, { className: `mode-${e}` }), V(t)] },
            e,
          ),
        ),
      }),
    ],
  });
}
function Oe({ pattern: e }) {
  return j(u, {
    spacing: 2,
    children: [
      j(O, {
        className: `card-grid pattern-grid`,
        children: [
          h(Y, {
            label: V(`activeLoadProfile`),
            value: X(e.activeLabel || `-`),
          }),
          h(Y, {
            label: V(`profileForecast`),
            value: `${$(e.activeEstimateKwh, 2)} kWh`,
          }),
          h(Y, { label: V(`baseLoadProfile`), value: Qe(e.baseLoadW) }),
          h(Y, {
            label: V(`todayProjected`),
            value: `${$(e.todayProjectedKwh, 2)} kWh`,
          }),
        ],
      }),
      e.reason
        ? h(s, {
            variant: `body2`,
            color: `text.secondary`,
            children: X(e.reason),
          })
        : null,
      Array.isArray(e.profiles) && e.profiles.length
        ? h(_, {
            children: j(w, {
              size: `small`,
              children: [
                h(D, {
                  children: j(A, {
                    children: [
                      h(y, { children: V(`profile`) }),
                      h(y, { children: V(`averageConsumption`) }),
                      h(y, { children: V(`range`) }),
                      h(y, { children: V(`confidence`) }),
                    ],
                  }),
                }),
                h(b, {
                  children: e.profiles.map((e) =>
                    j(
                      A,
                      {
                        children: [
                          h(y, { children: X(e.label || `-`) }),
                          j(y, { children: [$(e.averageKwh, 2), ` kWh`] }),
                          j(y, {
                            children: [
                              $(e.minKwh, 2),
                              ` -`,
                              ` `,
                              $(e.maxKwh, 2),
                              ` kWh`,
                            ],
                          }),
                          h(y, { children: $(e.confidence, 2) }),
                        ],
                      },
                      e.label || e.id,
                    ),
                  ),
                }),
              ],
            }),
          })
        : null,
    ],
  });
}
function Y({ label: e, value: t }) {
  return j(m, {
    className: `metric-card`,
    elevation: 0,
    children: [
      h(s, { variant: `h6`, children: t }),
      h(s, { variant: `caption`, color: `text.secondary`, children: e }),
    ],
  });
}
function ke({ assignments: e, selectStatePath: t, updateAssignment: n }) {
  return e.length
    ? h(u, {
        spacing: 2,
        children: Re(e).map((e) =>
          h(
            m,
            {
              className: `section group-card`,
              elevation: 0,
              children: j(u, {
                spacing: 1,
                children: [
                  j(O, {
                    className: `group-title-row`,
                    children: [
                      h(s, {
                        variant: `subtitle1`,
                        component: `h2`,
                        noWrap: !0,
                        children: e.title,
                      }),
                      e.subtitle
                        ? h(p, { size: `small`, label: e.subtitle })
                        : null,
                    ],
                  }),
                  h(S, {}),
                  h(_, {
                    children: j(w, {
                      size: `small`,
                      className: `datapoint-table`,
                      children: [
                        j(`colgroup`, {
                          children: [
                            h(`col`, { className: `datapoint-col-label` }),
                            h(`col`, { className: `datapoint-col-type` }),
                            h(`col`, { className: `datapoint-col-unit` }),
                            h(`col`, { className: `datapoint-col-power-type` }),
                            h(`col`, { className: `datapoint-col-state` }),
                            h(`col`, { className: `datapoint-col-required` }),
                          ],
                        }),
                        h(D, {
                          children: j(A, {
                            children: [
                              h(y, { children: V(`value`) }),
                              h(y, { children: V(`type`) }),
                              h(y, { children: V(`unit`) }),
                              h(y, { children: `AC/DC` }),
                              h(y, { children: `ioBroker State-Path` }),
                              h(y, { children: V(`required`) }),
                            ],
                          }),
                        }),
                        h(b, {
                          children: e.rows.map(({ assignment: e, index: r }) =>
                            j(
                              A,
                              {
                                children: [
                                  j(y, {
                                    children: [
                                      j(u, {
                                        direction: `row`,
                                        alignItems: `center`,
                                        gap: 0.5,
                                        children: [
                                          h(s, {
                                            variant: `body2`,
                                            children: Me(e),
                                          }),
                                          h(Ae, {
                                            id: `${e.mappingKey || e.key}-${r}`,
                                            text: Ne(e),
                                          }),
                                        ],
                                      }),
                                      h(s, {
                                        variant: `caption`,
                                        color: `text.secondary`,
                                        children: Ge(e.key),
                                      }),
                                    ],
                                  }),
                                  h(y, { children: Pe(e) }),
                                  h(y, { children: ze(e) }),
                                  h(y, { children: Be(e, r, n) }),
                                  j(y, {
                                    children: [
                                      h(k, {
                                        value: e.stateId || ``,
                                        onChange: (e) =>
                                          n(r, { stateId: e.target.value }),
                                        size: `small`,
                                        fullWidth: !0,
                                        autoComplete: `off`,
                                        inputProps: {
                                          autoComplete: `off`,
                                          autoCorrect: `off`,
                                          autoCapitalize: `none`,
                                          spellCheck: `false`,
                                          name: `aem-state-path-${r}`,
                                        },
                                        InputProps: {
                                          endAdornment: h(d, {
                                            position: `end`,
                                            children: h(x, {
                                              edge: `end`,
                                              "aria-label":
                                                V(`selectStatePath`),
                                              onClick: () => t(r),
                                              children: h(C, {}),
                                            }),
                                          }),
                                        },
                                      }),
                                      We(e.stateId)
                                        ? h(o, {
                                            className: `custom-state-path-warning`,
                                            severity: `error`,
                                            children: V(
                                              `customScriptStatePathWarning`,
                                            ),
                                          })
                                        : null,
                                    ],
                                  }),
                                  h(y, {
                                    children: e.required
                                      ? h(p, {
                                          color: `primary`,
                                          size: `small`,
                                          label: V(`required`),
                                        })
                                      : null,
                                  }),
                                ],
                              },
                              `${e.mappingKey || e.key}-${r}`,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            },
            e.key,
          ),
        ),
      })
    : h(je, { text: V(`noDatapointAssignments`) });
}
function Ae({ id: r, text: i }) {
  let [a, o] = n(!1),
    s = t(null);
  if (
    (e(
      () => () => {
        s.current && window.clearTimeout(s.current);
      },
      [],
    ),
    !i)
  )
    return null;
  function c() {
    (s.current && window.clearTimeout(s.current),
      (s.current = window.setTimeout(() => o(!1), me)));
  }
  function l(e) {
    (e.preventDefault(),
      e.stopPropagation(),
      o((e) => {
        let t = !e;
        return (t && c(), t);
      }));
  }
  return h(g, {
    disableFocusListener: !0,
    disableHoverListener: !0,
    disableTouchListener: !0,
    onClose: () => o(!1),
    open: a,
    title: i,
    slotProps: { tooltip: { className: `datapoint-tooltip` } },
    children: h(x, {
      "aria-label": V(`showInfo`),
      className: `datapoint-info-button`,
      onClick: l,
      onTouchEnd: l,
      size: `small`,
      children: h(re, { className: `datapoint-info-icon` }),
    }),
  });
}
function je({ text: e }) {
  return h(m, {
    className: `empty-state`,
    elevation: 0,
    children: h(s, { color: `text.secondary`, children: e }),
  });
}
function Me(e = {}) {
  let t = String(e.key || ``);
  return P[t] ? V(t) : e.label || t;
}
function Ne(e = {}) {
  let t = `${String(e.key || ``)}Help`;
  return P[t] ? V(t) : e.description || ``;
}
function Pe(e = {}) {
  let t = String(e.feature || ``);
  return P[t] ? V(t) : e.featureLabel || t;
}
function Fe(e) {
  let t = String(e || ``).trim();
  if (/^(\u0048\u0061\u0075\u0073\u0068\u0061\u006c\u0074|Household)$/i.test(t))
    return V(`household`);
  if (/^(\u0041\u006e\u006c\u0061\u0067\u0065|Plant)(\s+\d+)?$/i.test(t)) {
    var n;
    let e = (n = t.match(/\d+/)) == null ? void 0 : n[0];
    return e ? V(`plantTitle`, e).replace(/:$/, ``) : V(`plant`);
  }
  return t;
}
var Ie = {
  "Battery capacity": `dashboardBatteryCapacity`,
  "Consumption forecast": `dashboardConsumptionForecast`,
  "PV forecast": `dashboardPvForecast`,
  "Energy gap next 24h": `dashboardEnergyGapNext24h`,
  "Energy gap incl. reserve": `dashboardEnergyGapNext24h`,
  Recommendation: `dashboardRecommendation`,
  "Grid charging planned": `dashboardGridChargingPlanned`,
  Yes: `yes`,
  No: `no`,
  "Grid operation": `gridOperation`,
  "PV/battery operation": `pvBatteryOperation`,
  "Forecast pending": `forecastPending`,
  "Insufficient data": `insufficientData`,
  "Charge battery": `chargeBattery`,
  "Hold battery": `holdBattery`,
  "Use battery": `useBattery`,
  "No control": `noControl`,
  "No planning": `noPlanning`,
  "Household load from grid, battery is charging": `householdLoadFromGridBatteryCharging`,
  "Household load from grid, battery is charged briefly": `householdLoadFromGridBatteryChargedBriefly`,
  "Household load from grid/PV, battery is held": `householdLoadFromGridPvBatteryHeld`,
  "PV and battery cover consumption, grid charging is not planned": `pvBatteryCoverConsumption`,
  "PV is preferred": `pvPreferred`,
  "Avoid grid import": `avoidGridImport`,
  "No active grid charging": `noActiveGridCharging`,
  "Required forecast data is still pending": `requiredForecastPending`,
  "The planning window continues once all required forecast data is available.": `planningWindowContinues`,
  "No reliable decision": `noReliableDecision`,
  "Grid power is economical or necessary according to the calculation.": `gridPowerEconomical`,
  "Battery reserve is preserved until PV yield or a charging window is reached.": `batteryReservePreserved`,
  "Available battery energy and expected PV yield are sufficient.": `batteryPvSufficient`,
  "PV yield is used to cover consumption and battery.": `pvCoversConsumptionAndBattery`,
  "Battery may support household consumption.": `batterySupportsHousehold`,
  "No grid charging need detected.": `noGridChargingNeed`,
  "Telemetry, forecast or backend data are not sufficient for a decision.": `telemetryInsufficient`,
  "Grid charging": `gridCharging`,
  "Use PV": `usePv`,
  "Do not charge": `doNotCharge`,
  Hold: `hold`,
  Discharge: `discharge`,
  "Charge from PV": `chargeFromPv`,
  "No action": `noAction`,
};
function X(e) {
  let t = String(e || ``);
  return Ie[t] ? V(Ie[t]) : t;
}
function Le(e = {}) {
  return e.value === null || e.value === void 0 || e.value === ``
    ? `-`
    : X(e.value);
}
function Re(e) {
  let t = new Map(),
    n = 0;
  for (let [r, i] of e.entries()) {
    let e = `${i.scope}:${i.scopeId}`;
    if (!t.has(e)) {
      let r = i.scope === `household`,
        a = r
          ? null
          : Number.isFinite(Number(i.plantIndex))
            ? Number(i.plantIndex) + 1
            : n + 1;
      (r || (n += 1),
        t.set(e, {
          key: e,
          title: r ? V(`generalValues`) : V(`plantTitle`, a),
          subtitle: Fe(i.scopeName || (r ? `Household` : `Plant`)),
          order: r ? -1 : Number(i.plantIndex || 0),
          rows: [],
        }));
    }
    t.get(e).rows.push({ assignment: i, index: r });
  }
  return [...t.values()].sort((e, t) => e.order - t.order);
}
function ze(e) {
  return String(e.stateId || ``).trim()
    ? e.unit === `W`
      ? h(p, { size: `small`, label: e.sourceUnit === `kW` ? `kW` : `W` })
      : e.unit === `Wh`
        ? h(p, { size: `small`, label: e.sourceUnit === `kWh` ? `kWh` : `Wh` })
        : h(p, { size: `small`, label: e.unit || `-` })
    : h(p, { size: `small`, label: `-` });
}
function Be(e, t, n) {
  let r = He(e),
    i = r || Ve(e.powerType) || `AC`;
  return r
    ? h(p, { size: `small`, label: i })
    : e.unit === `W`
      ? j(k, {
          select: !0,
          size: `small`,
          value: i,
          onChange: (e) => n(t, { powerType: e.target.value }),
          fullWidth: !0,
          children: [
            h(f, { value: `AC`, children: `AC` }),
            h(f, { value: `DC`, children: `DC` }),
          ],
        })
      : null;
}
function Ve(e) {
  let t = String(e || ``)
    .trim()
    .toUpperCase();
  return t === `AC` || t === `DC` ? t : ``;
}
function He(e = {}) {
  return (
    {
      consumptionWh: `AC`,
      gridExportMeterWh: `AC`,
      gridPower: `AC`,
      gridTotalPower: `AC`,
      pvDailyYield: `DC`,
      pvForecast: `DC`,
      pvPower: `DC`,
      energyMeterPower: `AC`,
      wallboxAmpere: `AC`,
      wallboxPower: `AC`,
      wallboxWh: `AC`,
    }[String(e.key || ``)] || ``
  );
}
function Ue(e) {
  let t = Array.isArray(e) ? e : [];
  return t.length
    ? t.every(
        (e) => e.required !== !0 || String(e.stateId || ``).trim().length > 0,
      )
    : !1;
}
function We(e) {
  let t = String(e || ``)
    .trim()
    .toLowerCase();
  return t.startsWith(`0_userdata.`) || t.startsWith(`javascript.`);
}
function Ge(e) {
  return (
    {
      consumptionWh: `consumption`,
      gridExportMeterWh: `gridExportMeter`,
      wallboxWh: `wallbox`,
    }[e] ||
    e ||
    ``
  );
}
function Ke(e) {
  var t;
  return !(e == null || (t = e.errors) == null) && t.length
    ? V(`errorPrefix`, e.errors.join(`, `))
    : V(`errorUnknown`);
}
function qe(e) {
  return /fehler|failed|error|unauthorized|forbidden|authentication/i.test(
    String(e || ``),
  );
}
function Je(e) {
  if (!e) return `-`;
  let t = new Date(e);
  return Number.isNaN(t.getTime()) ? String(e) : t.toLocaleString(Z());
}
function Ye(e) {
  if (!e) return `-`;
  let t = new Date(e);
  return Number.isNaN(t.getTime())
    ? String(e)
    : t.toLocaleString(Z(), {
        year: `numeric`,
        month: `numeric`,
        day: `numeric`,
        hour: `2-digit`,
        minute: `2-digit`,
      });
}
function Xe(e) {
  if (!e) return `-`;
  let t = new Date(e);
  return Number.isNaN(t.getTime())
    ? String(e)
    : t.toLocaleTimeString(Z(), { hour: `2-digit`, minute: `2-digit` });
}
function Z() {
  let e = String(window.sysLang || navigator.language || `en`).trim();
  return { "zh-cn": `zh-CN` }[e.toLowerCase()] || e;
}
function Ze(e, t) {
  return `${Xe(e)} - ${Xe(t)}`;
}
function Q(e, t) {
  let n = Number(e);
  return Number.isFinite(n) ? n.toFixed(t) : `-`;
}
function $(e, t) {
  return e == null ? `-` : Q(e, t);
}
function Qe(e) {
  let t = Number(e);
  return Number.isFinite(t) && t > 0 ? `~${t.toFixed(0)} W` : `-/-`;
}
function $e(e) {
  return String(e || `none`).replace(/[^a-zA-Z0-9_-]/g, `_`) || `none`;
}
function et(e) {
  return $e(e.operatingMode || e.action);
}
function tt({ fallbackToSystem: e = !0 } = {}) {
  var t, n, r, i, a, o, s, c, l, u, d, f, p, m;
  let h = String(window.location.href).match(/[?&#]react=(dark|light)\b/i);
  if (h) return h[1].toLowerCase();
  let g = [
    (t = document.documentElement) == null || (t = t.dataset) == null
      ? void 0
      : t.theme,
    (n = document.documentElement) == null || (n = n.dataset) == null
      ? void 0
      : n.themeType,
    (r = document.body) == null || (r = r.dataset) == null ? void 0 : r.theme,
    (i = document.body) == null || (i = i.dataset) == null
      ? void 0
      : i.themeType,
    (a = document.documentElement) == null ? void 0 : a.className,
    (o = document.body) == null ? void 0 : o.className,
    (s = document.querySelector(`meta[name="theme-color"]`)) == null
      ? void 0
      : s.content,
    (c = window.localStorage) == null ? void 0 : c.getItem(`App.theme`),
    (l = window.localStorage) == null ? void 0 : l.getItem(`App.themeName`),
    (u = window.localStorage) == null ? void 0 : u.getItem(`App.themeType`),
    (d = window.localStorage) == null ? void 0 : d.getItem(`theme`),
    (f = window.localStorage) == null ? void 0 : f.getItem(`themeType`),
  ];
  for (let e of g) {
    let t = String(e || ``).toLowerCase();
    if (/\bdark\b|dark/i.test(t)) return `dark`;
    if (/\blight\b|blue/i.test(t)) return `light`;
  }
  return e
    ? (p = (m = window).matchMedia) != null &&
      p.call(m, `(prefers-color-scheme: dark)`).matches
      ? `dark`
      : `light`
    : ``;
}
function nt() {
  let [t, r] = n(() => tt({ fallbackToSystem: !1 }));
  return (
    e(() => {
      var e, t, n;
      let i = () => {
          r((e) => {
            let t = tt({ fallbackToSystem: !1 });
            return e === t ? e : t;
          });
        },
        a =
          (e = (t = window).matchMedia) == null
            ? void 0
            : e.call(t, `(prefers-color-scheme: dark)`),
        o = new MutationObserver(i);
      (o.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: [`class`, `data-theme`, `data-theme-type`, `style`],
      }),
        document.body &&
          o.observe(document.body, {
            attributes: !0,
            attributeFilter: [
              `class`,
              `data-theme`,
              `data-theme-type`,
              `style`,
            ],
          }),
        a == null || (n = a.addEventListener) == null || n.call(a, `change`, i),
        window.addEventListener(`storage`, i),
        window.addEventListener(`focus`, i));
      let s = window.setInterval(i, 1e3);
      return (
        i(),
        () => {
          var e;
          (o.disconnect(),
            a == null ||
              (e = a.removeEventListener) == null ||
              e.call(a, `change`, i),
            window.removeEventListener(`storage`, i),
            window.removeEventListener(`focus`, i),
            window.clearInterval(s));
        }
      );
    }, []),
    t
  );
}
var rt = class extends a.Component {
    componentDidMount() {
      ((this.root = M(this.container)), this.renderApp());
    }
    componentDidUpdate() {
      this.renderApp();
    }
    componentWillUnmount() {
      var e;
      (e = this.root) == null || e.unmount();
    }
    renderApp() {
      var e, t;
      (e = this.root) == null ||
        e.render(
          h(Ce, {
            adapterName: this.props.adapterName,
            adminSocket: this.props.socket,
            adminLanguage:
              (t = this.props.socket) == null ? void 0 : t.systemLang,
            adminTheme: this.props.theme,
            adminThemeType: this.props.themeType,
            configData: this.props.data,
            instance: this.props.instance,
            onConfigChange: this.props.onChange,
          }),
        );
    }
    render() {
      return h(`div`, {
        className: `aem-config-root`,
        ref: (e) => {
          this.container = e;
        },
      });
    }
  },
  it = { AemConfig: rt };
window.aemStandaloneConfig &&
  M(document.getElementById(`root`)).render(h(Ce, {}));
export { rt as AemConfig, it as default };
