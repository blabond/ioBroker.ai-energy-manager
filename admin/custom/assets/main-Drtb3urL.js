import "./virtual_mf-exposes___mfe_internal__ConfigCustomAiEnergyManager__customComponents_js-SNs-HRdP.js";
import "./virtual_mf-REMOTE_ENTRY_ID___mfe_internal__ConfigCustomAiEnergyManager__customComponents_js-rxIXd_4z.js";
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
  a as te,
  b as ne,
  c as re,
  d as v,
  f as ie,
  g as y,
  h as b,
  j as x,
  k as S,
  l as ae,
  m as C,
  n as w,
  p as oe,
  t as se,
  u as T,
  v as E,
  w as D,
  x as O,
  y as k,
  z as A,
} from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DbPfsCnh.js";
import { t as j } from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare__react_mf_2_dom_mf_1_client__loadShare__.mjs-BZ6R6Oj7.js";
i();
var M = {
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
    gridPower: `Netzzähler wert`,
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
    sixHourPlan: `6-Stunden-Plan`,
    noSixHourPlan: `Noch kein 6-Stunden-Plan vorhanden.`,
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
    dashboardEnergyGapNext24h: `Versorgungslücke nächste 24h`,
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
  },
  N = {
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
    sixHourPlan: `6-hour plan`,
    noSixHourPlan: `No 6-hour plan available yet.`,
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
    dashboardEnergyGapNext24h: `Energy gap next 24h`,
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
  },
  fe = 2e4,
  pe = [
    [`grid_operation`, `gridOperation`],
    [`pv_battery_operation`, `pvBatteryOperation`],
    [`insufficient_data`, `insufficientData`],
  ],
  z = 5e3,
  me = new Set([
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
    de: M,
    en: N,
    es: ce,
    fr: P,
    it: F,
    nl: I,
    pl: le,
    pt: L,
    ru: ue,
    uk: R,
    "zh-cn": de,
  };
(w.setTranslations(te),
  ge(),
  w.setLanguage(V(window.sysLang || window.systemLang || `en`)));
function B(e, ...t) {
  return w.t(e, ...t);
}
function V(e) {
  let t = String(e || ``)
    .trim()
    .toLowerCase();
  if (!t) return `en`;
  if (t.startsWith(`zh`)) return `zh-cn`;
  let n = t.slice(0, 2);
  return me.has(t) ? t : me.has(n) ? n : `en`;
}
function ge() {
  w.extendTranslations(he);
}
function _e(t, r) {
  let [i, a] = n(() =>
    V(
      r ||
        (t == null ? void 0 : t.systemLang) ||
        window.sysLang ||
        window.systemLang ||
        w.getLanguage(),
    ),
  );
  return (
    e(() => {
      let e = !0,
        n = V(
          r ||
            (t == null ? void 0 : t.systemLang) ||
            window.sysLang ||
            window.systemLang ||
            w.getLanguage(),
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
                  V(
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
    w.setLanguage(i),
    i
  );
}
var H = {
    adapterToken: ``,
    serverConfigLastRequest: ``,
    datapointAssignments: [],
    dashboardLite: null,
  },
  U = { ...H },
  W = () => {},
  G = null,
  K = null,
  q = ``;
function J(e) {
  return JSON.parse(JSON.stringify(e ?? null));
}
function ve() {
  W();
}
function ye(e) {
  let t = J(e) || {};
  return (delete t.dashboardLite, delete t.dashboardLiteLastRequest, t);
}
function be(e) {
  e(ye(U));
}
window.aemStandaloneConfig &&
  ((window.load = (e, t) => {
    let n = J(e) || {};
    ((U = {
      ...H,
      ...n,
      dashboardLite: n.dashboardLite || K,
      dashboardLiteLastRequest: n.dashboardLiteLastRequest || q,
    }),
      (W = typeof t == `function` ? t : () => {}),
      G == null || G(U),
      W(!1));
  }),
  (window.save = be));
function xe({
  adminSocket: i = null,
  adminTheme: a = null,
  adminThemeType: o = ``,
  adminLanguage: c = ``,
  adapterName: d = `ai-energy-manager`,
  configData: f = null,
  instance: p = 0,
  onConfigChange: g = null,
} = {}) {
  var _, te, v, y;
  _e(i, c);
  let b = typeof g == `function`,
    [x, S] = n(() => ({ ...H, ...(J(f) || U) })),
    [ae, C] = n(0),
    [w, T] = n(``),
    [E, O] = n(``),
    [k, j] = n(!1),
    [M, N] = n(null),
    ce = et(),
    P = t(x);
  G = (e) => {
    b || S({ ...e });
  };
  let F =
      ce ||
      o ||
      (a == null || (_ = a.palette) == null ? void 0 : _.mode) ||
      $e({ fallbackToSystem: !0 }),
    I =
      (a == null || (te = a.palette) == null ? void 0 : te.mode) === F
        ? a
        : null,
    le = r(
      () =>
        I ||
        l({
          palette: {
            mode: F,
            primary: { main: `#1976d2` },
            secondary: { main: `#2e7d32` },
            background:
              F === `dark`
                ? { default: `#101418`, paper: `#171d22` }
                : { default: `#f5f7fa`, paper: `#ffffff` },
          },
          shape: { borderRadius: 6 },
        }),
      [I, F],
    );
  (e(() => {
    P.current = x;
  }, [x]),
    e(() => {
      if (!b) return;
      let e = {
        ...H,
        ...(J(f) || {}),
        dashboardLite: P.current.dashboardLite || K,
        dashboardLiteLastRequest: P.current.dashboardLiteLastRequest || q,
      };
      ((U = e), (P.current = e), S(e));
    }, [f, b]));
  function L(e, t = !0) {
    let n = typeof e == `function` ? e(J(P.current)) : e;
    ((U = { ...H, ...(n || {}) }),
      (P.current = U),
      S(U),
      t && (b ? g(ye(U)) : ve()));
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
    n({ ok: !1, errors: [B(`adminConnectionUnavailable`)] });
  }
  function de() {
    let e = String(x.adapterToken || ``).trim();
    if (!e) return;
    let t = !1,
      n = window.setTimeout(() => {
        t || ((t = !0), j(!1), T(B(`adapterNoResponse`)));
      }, fe);
    (j(!0),
      T(B(`configLoading`)),
      R(`requestConfig`, { source: `admin`, adapterToken: e }, (e) => {
        if (!t) {
          if (((t = !0), window.clearTimeout(n), j(!1), !e || e.ok === !1)) {
            T(We(e));
            return;
          }
          (L((t) => ({
            ...t,
            serverConfig: e.serverConfig || t.serverConfig,
            serverConfigLastRequest: e.serverConfigLastRequest || ``,
            datapointAssignments:
              e.datapointAssignments || t.datapointAssignments || [],
          })),
            T(B(`configLoaded`)));
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
            O(We(t));
            return;
          }
          (t.dashboardLite &&
            ((K = t.dashboardLite), (q = t.dashboardLiteLastRequest || ``)),
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
            O(
              t.dashboardLiteLastRequest
                ? B(`autoUpdated`, Ke(t.dashboardLiteLastRequest))
                : B(`waitingForDashboardData`),
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
      N(e);
      return;
    }
    try {
      var r, a;
      let t = await ((r = (a = window).aemSelectStatePath) == null
        ? void 0
        : r.call(a, n));
      t && z(e, { stateId: t });
    } catch (e) {
      T((e == null ? void 0 : e.message) || B(`objectSelectionUnavailable`));
    }
  }
  let he = String(x.adapterToken || ``).trim().length > 0,
    V = he && ((v = x.serverConfig) == null ? void 0 : v.valid) === !0,
    ge = Ve(x.datapointAssignments || []);
  return A(ee, {
    theme: le,
    children: [
      h(D, {
        className: `aem-root${b ? ` aem-root-embedded` : ``}`,
        children: h(m, {
          className: `aem-shell`,
          elevation: 0,
          children: A(u, {
            spacing: 2,
            children: [
              h(u, {
                direction: { xs: `column`, md: `row` },
                justifyContent: `space-between`,
                gap: 1,
                children: A(D, {
                  children: [
                    h(s, {
                      variant: `h6`,
                      component: `h1`,
                      children: `AI Energy Manager`,
                    }),
                    A(s, {
                      variant: `body2`,
                      color: `text.secondary`,
                      children: [
                        B(`noAccountOrToken`),
                        ` `,
                        h(`a`, {
                          href: `https://smartenergy.mr-bond.de`,
                          target: `_blank`,
                          rel: `noreferrer`,
                          children: B(`openSmartEnergyPortal`),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              A(ne, {
                value: ae,
                onChange: (e, t) => C(t),
                children: [
                  h(oe, {
                    icon: h(ie, {}),
                    iconPosition: `start`,
                    label: B(`dashboard`),
                  }),
                  h(oe, {
                    icon: h(re, {}),
                    iconPosition: `start`,
                    label: B(`settings`),
                  }),
                ],
              }),
              ae === 0
                ? h(Se, {
                    dashboardStatus: E,
                    hasRequiredSettings: ge,
                    hasValidToken: V,
                    settings: x,
                  })
                : h(Ce, {
                    assignments: x.datapointAssignments || [],
                    busyConfig: k,
                    hasToken: he,
                    requestConfig: de,
                    requestStatus: w,
                    selectStatePath: me,
                    settings: x,
                    setField: ue,
                    updateAssignment: z,
                  }),
            ],
          }),
        }),
      }),
      i != null && i.sendTo && M !== null
        ? h(se, {
            columns: [`name`, `type`, `role`, `val`],
            onClose: () => N(null),
            onOk: (e) => {
              (typeof e == `string` && e && z(M, { stateId: e }), N(null));
            },
            selected:
              ((y = x.datapointAssignments) == null || (y = y[M]) == null
                ? void 0
                : y.stateId) || ``,
            socket: i,
            theme: le,
            themeType: F,
            title: B(`selectStatePathTitle`),
            types: `state`,
          })
        : null,
    ],
  });
}
function Se({
  dashboardStatus: e,
  hasRequiredSettings: t,
  hasValidToken: n,
  settings: r,
}) {
  return n
    ? t
      ? A(u, {
          spacing: 2,
          children: [
            e && Ge(e) ? h(o, { severity: `error`, children: e }) : null,
            h(we, { dashboard: r.dashboardLite }),
          ],
        })
      : h(o, { severity: `warning`, children: B(`dashboardRequiredMissing`) })
    : h(o, { severity: `warning`, children: B(`settingsTokenMissing`) });
}
function Ce({
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
  return A(u, {
    spacing: 2,
    children: [
      A(Y, {
        title: B(`connection`),
        children: [
          A(D, {
            className: `settings-field-grid`,
            children: [
              h(O, {
                label: B(`adapterToken`),
                type: `password`,
                value: s.adapterToken || ``,
                onChange: (e) => l(`adapterToken`, e.target.value),
                autoComplete: `off`,
                fullWidth: !0,
              }),
              h(O, {
                label: B(`lastConfigRequest`),
                value: Ke(s.serverConfigLastRequest),
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
              startIcon: h(T, {}),
              onClick: r,
              children: `Request Config`,
            }),
          }),
          i ? h(o, { severity: Ge(i) ? `error` : `info`, children: i }) : null,
        ],
      }),
      h(De, { assignments: e, selectStatePath: a, updateAssignment: d }),
      h(o, { severity: `info`, children: B(`acDcInfo`) }),
    ],
  });
}
function we({ dashboard: e }) {
  return e
    ? A(u, {
        spacing: 2,
        children: [
          A(Y, {
            title: `Dashboard`,
            children: [
              h(D, {
                className: `card-grid`,
                children: (e.cards || []).map((e, t) =>
                  A(
                    m,
                    {
                      className: `metric-card`,
                      children: [
                        A(s, {
                          variant: `h6`,
                          children: [
                            Fe(e),
                            e.unit
                              ? A(`span`, { children: [` `, e.unit] })
                              : null,
                          ],
                        }),
                        h(s, {
                          variant: `caption`,
                          color: `text.secondary`,
                          children: Z(e.label || ``),
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
                    children: Z(e.reason),
                  })
                : null,
            ],
          }),
          h(Y, {
            title: B(`sixHourPlan`),
            children: h(Te, { plan: e.plan || [] }),
          }),
          h(Y, {
            title: B(`patternDetection`),
            children: h(Ee, { pattern: e.pattern || {} }),
          }),
        ],
      })
    : h(ke, { text: B(`noDashboardData`) });
}
function Y({ children: e, title: t }) {
  return A(m, {
    className: `section`,
    elevation: 0,
    children: [h(s, { variant: `subtitle1`, component: `h2`, children: t }), e],
  });
}
function Te({ plan: e }) {
  return e.length
    ? A(u, {
        spacing: 1.5,
        children: [
          h(D, {
            className: `plan-timeline`,
            "aria-label": `6-Stunden-Plan`,
            children: e.slice(0, 6).map((e, t) =>
              h(
                g,
                {
                  title: `${Ye(e.from, e.to)} · ${Z(e.operatingModeLabel || e.actionLabel || `-`)} · ${Z(e.batteryCommand || `-`)} · ${Z(e.gridBehavior || `-`)} · ${Q(e.plannedPowerW, 0)} W · ${Q(e.plannedEnergyKwh, 2)} kWh${e.technicalActionLabel ? ` · ${B(`technicalAction`, Z(e.technicalActionLabel))}` : ``}${e.reason ? ` · ${Z(e.reason)}` : ``}`,
                  children: A(D, {
                    className: `plan-slot mode-border-${Qe(e)}`,
                    tabIndex: 0,
                    children: [
                      h(s, {
                        variant: `caption`,
                        color: `text.secondary`,
                        children: Ye(e.from, e.to),
                      }),
                      h(s, {
                        variant: `body2`,
                        className: `plan-slot-action`,
                        noWrap: !0,
                        children: Z(
                          e.operatingModeLabel || e.actionLabel || `-`,
                        ),
                      }),
                      h(s, {
                        variant: `caption`,
                        className: `plan-slot-command`,
                        noWrap: !0,
                        children: Z(e.batteryCommand || `-`),
                      }),
                      A(s, {
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
          h(D, {
            className: `plan-legend`,
            children: pe.map(([e, t]) =>
              A(
                `span`,
                { children: [h(`i`, { className: `mode-${e}` }), B(t)] },
                e,
              ),
            ),
          }),
        ],
      })
    : h(ke, { text: B(`noSixHourPlan`) });
}
function Ee({ pattern: e }) {
  return A(u, {
    spacing: 2,
    children: [
      A(D, {
        className: `card-grid pattern-grid`,
        children: [
          h(X, {
            label: B(`activeLoadProfile`),
            value: Z(e.activeLabel || `-`),
          }),
          h(X, {
            label: B(`profileForecast`),
            value: `${$(e.activeEstimateKwh, 2)} kWh`,
          }),
          h(X, { label: B(`baseLoadProfile`), value: Xe(e.baseLoadW) }),
          h(X, {
            label: B(`todayProjected`),
            value: `${$(e.todayProjectedKwh, 2)} kWh`,
          }),
        ],
      }),
      e.reason
        ? h(s, {
            variant: `body2`,
            color: `text.secondary`,
            children: Z(e.reason),
          })
        : null,
      Array.isArray(e.profiles) && e.profiles.length
        ? h(_, {
            children: A(C, {
              size: `small`,
              children: [
                h(E, {
                  children: A(k, {
                    children: [
                      h(y, { children: B(`profile`) }),
                      h(y, { children: B(`averageConsumption`) }),
                      h(y, { children: B(`range`) }),
                      h(y, { children: B(`confidence`) }),
                    ],
                  }),
                }),
                h(b, {
                  children: e.profiles.map((e) =>
                    A(
                      k,
                      {
                        children: [
                          h(y, { children: Z(e.label || `-`) }),
                          A(y, { children: [$(e.averageKwh, 2), ` kWh`] }),
                          A(y, {
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
function X({ label: e, value: t }) {
  return A(m, {
    className: `metric-card`,
    elevation: 0,
    children: [
      h(s, { variant: `h6`, children: t }),
      h(s, { variant: `caption`, color: `text.secondary`, children: e }),
    ],
  });
}
function De({ assignments: e, selectStatePath: t, updateAssignment: n }) {
  return e.length
    ? h(u, {
        spacing: 2,
        children: Ie(e).map((e) =>
          h(
            m,
            {
              className: `section group-card`,
              elevation: 0,
              children: A(u, {
                spacing: 1,
                children: [
                  A(D, {
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
                    children: A(C, {
                      size: `small`,
                      className: `datapoint-table`,
                      children: [
                        A(`colgroup`, {
                          children: [
                            h(`col`, { className: `datapoint-col-label` }),
                            h(`col`, { className: `datapoint-col-type` }),
                            h(`col`, { className: `datapoint-col-unit` }),
                            h(`col`, { className: `datapoint-col-power-type` }),
                            h(`col`, { className: `datapoint-col-state` }),
                            h(`col`, { className: `datapoint-col-required` }),
                          ],
                        }),
                        h(E, {
                          children: A(k, {
                            children: [
                              h(y, { children: B(`value`) }),
                              h(y, { children: B(`type`) }),
                              h(y, { children: B(`unit`) }),
                              h(y, { children: `AC/DC` }),
                              h(y, { children: `ioBroker State-Path` }),
                              h(y, { children: B(`required`) }),
                            ],
                          }),
                        }),
                        h(b, {
                          children: e.rows.map(({ assignment: e, index: r }) =>
                            A(
                              k,
                              {
                                children: [
                                  A(y, {
                                    children: [
                                      A(u, {
                                        direction: `row`,
                                        alignItems: `center`,
                                        gap: 0.5,
                                        children: [
                                          h(s, {
                                            variant: `body2`,
                                            children: Ae(e),
                                          }),
                                          h(Oe, {
                                            id: `${e.mappingKey || e.key}-${r}`,
                                            text: je(e),
                                          }),
                                        ],
                                      }),
                                      h(s, {
                                        variant: `caption`,
                                        color: `text.secondary`,
                                        children: Ue(e.key),
                                      }),
                                    ],
                                  }),
                                  h(y, { children: Me(e) }),
                                  h(y, { children: Le(e) }),
                                  h(y, { children: Re(e, r, n) }),
                                  A(y, {
                                    children: [
                                      h(O, {
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
                                                B(`selectStatePath`),
                                              onClick: () => t(r),
                                              children: h(ae, {}),
                                            }),
                                          }),
                                        },
                                      }),
                                      He(e.stateId)
                                        ? h(o, {
                                            className: `custom-state-path-warning`,
                                            severity: `error`,
                                            children: B(
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
                                          label: B(`required`),
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
    : h(ke, { text: B(`noDatapointAssignments`) });
}
function Oe({ id: r, text: i }) {
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
      (s.current = window.setTimeout(() => o(!1), z)));
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
      "aria-label": B(`showInfo`),
      className: `datapoint-info-button`,
      onClick: l,
      onTouchEnd: l,
      size: `small`,
      children: h(v, { className: `datapoint-info-icon` }),
    }),
  });
}
function ke({ text: e }) {
  return h(m, {
    className: `empty-state`,
    elevation: 0,
    children: h(s, { color: `text.secondary`, children: e }),
  });
}
function Ae(e = {}) {
  let t = String(e.key || ``);
  return N[t] ? B(t) : e.label || t;
}
function je(e = {}) {
  let t = `${String(e.key || ``)}Help`;
  return N[t] ? B(t) : e.description || ``;
}
function Me(e = {}) {
  let t = String(e.feature || ``);
  return N[t] ? B(t) : e.featureLabel || t;
}
function Ne(e) {
  let t = String(e || ``).trim();
  if (/^(\u0048\u0061\u0075\u0073\u0068\u0061\u006c\u0074|Household)$/i.test(t))
    return B(`household`);
  if (/^(\u0041\u006e\u006c\u0061\u0067\u0065|Plant)(\s+\d+)?$/i.test(t)) {
    var n;
    let e = (n = t.match(/\d+/)) == null ? void 0 : n[0];
    return e ? B(`plantTitle`, e).replace(/:$/, ``) : B(`plant`);
  }
  return t;
}
var Pe = {
  "Battery capacity": `dashboardBatteryCapacity`,
  "Consumption forecast": `dashboardConsumptionForecast`,
  "PV forecast": `dashboardPvForecast`,
  "Energy gap next 24h": `dashboardEnergyGapNext24h`,
  Recommendation: `dashboardRecommendation`,
  "Grid charging planned": `dashboardGridChargingPlanned`,
  Yes: `yes`,
  No: `no`,
  "Grid operation": `gridOperation`,
  "PV/battery operation": `pvBatteryOperation`,
  "Insufficient data": `insufficientData`,
  "Charge battery": `chargeBattery`,
  "Hold battery": `holdBattery`,
  "Use battery": `useBattery`,
  "No control": `noControl`,
  "Household load from grid, battery is charging": `householdLoadFromGridBatteryCharging`,
  "Household load from grid, battery is charged briefly": `householdLoadFromGridBatteryChargedBriefly`,
  "Household load from grid/PV, battery is held": `householdLoadFromGridPvBatteryHeld`,
  "PV and battery cover consumption, grid charging is not planned": `pvBatteryCoverConsumption`,
  "PV is preferred": `pvPreferred`,
  "Avoid grid import": `avoidGridImport`,
  "No active grid charging": `noActiveGridCharging`,
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
function Z(e) {
  let t = String(e || ``);
  return Pe[t] ? B(Pe[t]) : t;
}
function Fe(e = {}) {
  return e.value === null || e.value === void 0 || e.value === ``
    ? `-`
    : Z(e.value);
}
function Ie(e) {
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
          title: r ? B(`generalValues`) : B(`plantTitle`, a),
          subtitle: Ne(i.scopeName || (r ? `Household` : `Plant`)),
          order: r ? -1 : Number(i.plantIndex || 0),
          rows: [],
        }));
    }
    t.get(e).rows.push({ assignment: i, index: r });
  }
  return [...t.values()].sort((e, t) => e.order - t.order);
}
function Le(e) {
  return String(e.stateId || ``).trim()
    ? e.unit === `W`
      ? h(p, { size: `small`, label: e.sourceUnit === `kW` ? `kW` : `W` })
      : e.unit === `Wh`
        ? h(p, { size: `small`, label: e.sourceUnit === `kWh` ? `kWh` : `Wh` })
        : h(p, { size: `small`, label: e.unit || `-` })
    : h(p, { size: `small`, label: `-` });
}
function Re(e, t, n) {
  let r = Be(e),
    i = r || ze(e.powerType) || `AC`;
  return r
    ? h(p, { size: `small`, label: i })
    : e.unit === `W`
      ? A(O, {
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
function ze(e) {
  let t = String(e || ``)
    .trim()
    .toUpperCase();
  return t === `AC` || t === `DC` ? t : ``;
}
function Be(e = {}) {
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
function Ve(e) {
  let t = Array.isArray(e) ? e : [];
  return t.length
    ? t.every(
        (e) => e.required !== !0 || String(e.stateId || ``).trim().length > 0,
      )
    : !1;
}
function He(e) {
  let t = String(e || ``)
    .trim()
    .toLowerCase();
  return t.startsWith(`0_userdata.`) || t.startsWith(`javascript.`);
}
function Ue(e) {
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
function We(e) {
  var t;
  return !(e == null || (t = e.errors) == null) && t.length
    ? B(`errorPrefix`, e.errors.join(`, `))
    : B(`errorUnknown`);
}
function Ge(e) {
  return /fehler|failed|error|unauthorized|forbidden|authentication/i.test(
    String(e || ``),
  );
}
function Ke(e) {
  if (!e) return `-`;
  let t = new Date(e);
  return Number.isNaN(t.getTime()) ? String(e) : t.toLocaleString(Je());
}
function qe(e) {
  if (!e) return `-`;
  let t = new Date(e);
  return Number.isNaN(t.getTime())
    ? String(e)
    : t.toLocaleTimeString(Je(), { hour: `2-digit`, minute: `2-digit` });
}
function Je() {
  let e = String(window.sysLang || navigator.language || `en`).trim();
  return { "zh-cn": `zh-CN` }[e.toLowerCase()] || e;
}
function Ye(e, t) {
  return `${qe(e)} - ${qe(t)}`;
}
function Q(e, t) {
  let n = Number(e);
  return Number.isFinite(n) ? n.toFixed(t) : `-`;
}
function $(e, t) {
  return e == null ? `-` : Q(e, t);
}
function Xe(e) {
  let t = Number(e);
  return Number.isFinite(t) && t > 0 ? `~${t.toFixed(0)} W` : `-/-`;
}
function Ze(e) {
  return String(e || `none`).replace(/[^a-zA-Z0-9_-]/g, `_`) || `none`;
}
function Qe(e) {
  return Ze(e.operatingMode || e.action);
}
function $e({ fallbackToSystem: e = !0 } = {}) {
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
function et() {
  let [t, r] = n(() => $e({ fallbackToSystem: !1 }));
  return (
    e(() => {
      var e, t, n;
      let i = () => {
          r((e) => {
            let t = $e({ fallbackToSystem: !1 });
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
var tt = class extends a.Component {
    componentDidMount() {
      ((this.root = j(this.container)), this.renderApp());
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
          h(xe, {
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
  nt = { AemConfig: tt };
window.aemStandaloneConfig &&
  j(document.getElementById(`root`)).render(h(xe, {}));
export { tt as AemConfig, nt as default };
