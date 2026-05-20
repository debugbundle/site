export type SchemaReferenceLink = {
  title: string;
  href: string;
  description: string;
};

export type ApiReferenceEntry = {
  method: string;
  path: string;
  operationId: string;
  summary: string;
  tags: string[];
  auth: string[];
};

export type CliReferenceEntry = {
  commandPath: string;
  usage: string;
  group: string;
};

export type McpToolReferenceEntry = {
  name: string;
  description: string;
  requiredArguments: string[];
  optionalArguments: string[];
};

export type McpToolReferenceGroup = {
  group: string;
  label: string;
  tools: McpToolReferenceEntry[];
};

export type ErrorCodeReference = {
  codes: Array<{ code: string; statusCodes: string[] }>;
  categories: string[];
};

export type ReferenceData = {
  release: {
    coreVersion: string;
  };
  apiEntries: ApiReferenceEntry[];
  cliEntries: CliReferenceEntry[];
  mcpGroups: McpToolReferenceGroup[];
  webhookReference: {
    eventTypes: string[];
    schemaPath: string;
    overviewPath: string;
  };
  schemaLinks: SchemaReferenceLink[];
  errorReference: ErrorCodeReference;
};
