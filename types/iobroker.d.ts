declare global {
    namespace ioBroker {
        interface AdapterConfig {
            adapterToken?: string;
            backendUrl?: string;
            commandPollIntervalSeconds?: number;
            datapointAssignments?: unknown[];
            datapoints?: Record<string, unknown>;
            dashboardLite?: unknown;
            dashboardLiteLastRequest?: string;
            minWriteIntervalSeconds?: number;
            sendIntervalSeconds?: number;
            sendOnlyChanged?: boolean;
            serverConfig?: Record<string, unknown> | null;
            serverConfigLastRequest?: string;
            serverConfigTokenFingerprint?: string;
        }
    }
}

export {};
