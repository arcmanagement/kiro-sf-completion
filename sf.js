// Kiro completion spec for Salesforce CLI (sf)
// Generated from: sf commands --json
// SF CLI version: 2.136.8
// Spec version:   2.136.8
//
// Installation:
//   Copy sf.js to your Kiro Specs folder
//   (Kiro → Settings → Editor → Specs Folder)
//
// Source: https://github.com/arcmanagement/kiro-sf-completion

/** Dynamic generator for --target-org and --target-dev-hub flags */
const orgGenerator = {
  script: ["sf", "org", "list", "--json"],
  postProcess: (out) => {
    try {
      const { result } = JSON.parse(out);
      const scratch = (result.scratchOrgs || []).map((o) => ({
        name: o.alias || o.username,
        description: `scratch • ${o.username}`,
        icon: "🧪",
      }));
      const nonScratch = (result.nonScratchOrgs || []).map((o) => ({
        name: o.alias || o.username,
        description: `${o.orgId} • ${o.username}`,
        icon: "☁️",
      }));
      return [...scratch, ...nonScratch].filter((o) => o.name);
    } catch {
      return [];
    }
  },
};

const completionSpec = {
  name: "sf",
  description: "Salesforce CLI",
  subcommands: [
    {
      name: "agent",
      subcommands: [
        {
          name: "activate",
          description: "Activate an agent in an org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--api-name",
                "-n"
              ],
              description: "API name of the agent to activate; if not specified, the command provides a list that you choose from.",
              args: {
                name: "api-name"
              }
            },
            {
              name: "--version",
              description: "Version number of the agent to activate; if not specified, the command provides a list that you choose from.",
              args: {
                name: "version"
              }
            }
          ]
        },
        {
          name: "create",
          description: "Create an agent in your org using a local agent spec file.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: "--name",
              description: "Name (label) of the new agent.",
              args: {
                name: "name"
              }
            },
            {
              name: "--api-name",
              description: "API name of the new agent; if not specified, the API name is derived from the agent name (label); the API name must not exist in the org.",
              args: {
                name: "api-name"
              }
            },
            {
              name: "--spec",
              description: "Path to an agent spec file.",
              args: {
                name: "spec",
                template: "filepaths"
              }
            },
            {
              name: "--preview",
              description: "Preview the agent without saving it in your org."
            }
          ]
        },
        {
          name: "deactivate",
          description: "Deactivate an agent in an org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--api-name",
                "-n"
              ],
              description: "API name of the agent to deactivate; if not specified, the command provides a list that you choose from.",
              args: {
                name: "api-name"
              }
            }
          ]
        },
        {
          name: "generate",
          subcommands: [
            {
              name: "agent-spec",
              description: "Generate an agent spec, which is a YAML file that captures what an agent can do.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--type",
                  description: "Type of agent to create. Internal types are copilots used internally by your company and customer types are the agents you create for your customers.",
                  args: {
                    name: "type",
                    suggestions: [
                      "customer",
                      "internal"
                    ]
                  }
                },
                {
                  name: "--role",
                  description: "Role of the agent.",
                  args: {
                    name: "role"
                  }
                },
                {
                  name: "--company-name",
                  description: "Name of your company.",
                  args: {
                    name: "company-name"
                  }
                },
                {
                  name: "--company-description",
                  description: "Description of your company.",
                  args: {
                    name: "company-description"
                  }
                },
                {
                  name: "--company-website",
                  description: "Website URL of your company.",
                  args: {
                    name: "company-website"
                  }
                },
                {
                  name: "--max-topics",
                  description: "Maximum number of topics to generate in the agent spec; default is 5.",
                  args: {
                    name: "max-topics"
                  }
                },
                {
                  name: "--agent-user",
                  description: "Username of a user in your org to assign to your agent; determines what your agent can access and do.",
                  args: {
                    name: "agent-user"
                  }
                },
                {
                  name: "--enrich-logs",
                  description: "Adds agent conversation data to event logs so you can view all agent session activity in one place.",
                  args: {
                    name: "enrich-logs",
                    suggestions: [
                      "true",
                      "false"
                    ]
                  }
                },
                {
                  name: "--tone",
                  description: "Conversational style of the agent, such as how it expresses your brand personality in its messages through word choice, punctuation, and sentence structure.",
                  args: {
                    name: "tone",
                    suggestions: [
                      "formal",
                      "casual",
                      "neutral"
                    ]
                  }
                },
                {
                  name: "--spec",
                  description: "Agent spec file, in YAML format, to use as input to the command.",
                  args: {
                    name: "spec",
                    template: "filepaths"
                  }
                },
                {
                  name: "--output-file",
                  description: "Path for the generated YAML agent spec file; can be an absolute or relative path.",
                  args: {
                    name: "output-file",
                    template: "filepaths"
                  }
                },
                {
                  name: "--full-interview",
                  description: "Prompt for both required and optional flags."
                },
                {
                  name: "--prompt-template",
                  description: "API name of a customized prompt template to use instead of the default prompt template.",
                  args: {
                    name: "prompt-template"
                  }
                },
                {
                  name: "--grounding-context",
                  description: "Context information and personalization that's added to your prompts when using a custom prompt template.",
                  args: {
                    name: "grounding-context"
                  }
                },
                {
                  name: "--force-overwrite",
                  description: "Don't prompt the user to confirm that an existing spec file will be overwritten."
                }
              ]
            },
            {
              name: "authoring-bundle",
              description: "Generate an authoring bundle from an existing agent spec YAML file.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-name",
                  description: "API name of the new authoring bundle; if not specified, the API name is derived from the authoring bundle name (label); the API name can't exist in the org.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--spec",
                    "-f"
                  ],
                  description: "Path to the agent spec YAML file. If you don't specify the flag, the command provides a list that you can choose from. Use the --no-spec flag to skip using an agent spec entirely.",
                  args: {
                    name: "spec",
                    template: "filepaths"
                  }
                },
                {
                  name: "--no-spec",
                  description: "Skip prompting for an agent spec and use the default Agent Script boilerplate in the generated authoring bundle."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory where the authoring bundle files are generated.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name (label) of the authoring bundle; if not specified, you're prompted for the name.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: "--force-overwrite",
                  description: "Overwrite the existing authoring bundle if one with the same API name already exists locally."
                }
              ]
            },
            {
              name: "template",
              description: "Generate an agent template from an existing agent in your DX project so you can then package the template in a second-generation managed package.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--source-org",
                    "-s"
                  ],
                  description: "Username or alias of the namespaced scratch org that contains the agent which this template is based on.",
                  args: {
                    name: "source-org"
                  },
                  isRequired: true
                },
                {
                  name: "--agent-version",
                  description: "Version of the agent (BotVersion).",
                  args: {
                    name: "agent-version"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--agent-file",
                    "-f"
                  ],
                  description: "Path to an agent (Bot) metadata file.",
                  args: {
                    name: "agent-file"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-dir",
                    "-r"
                  ],
                  description: "Directory where the generated BotTemplate and GenAiPlannerBundle files are saved.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                }
              ]
            },
            {
              name: "test-spec",
              description: "Generate an agent test spec, which is a YAML file that lists the test cases for testing a specific agent.",
              options: [
                {
                  name: [
                    "--from-definition",
                    "-d"
                  ],
                  description: "Filepath to the AIEvaluationDefinition metadata XML file in your DX project that you want to convert to a test spec YAML file.",
                  args: {
                    name: "from-definition"
                  }
                },
                {
                  name: "--force-overwrite",
                  description: "Don't prompt for confirmation when overwriting an existing test spec YAML file."
                },
                {
                  name: [
                    "--output-file",
                    "-f"
                  ],
                  description: "Name of the generated test spec YAML file. Default value is \"specs/<AGENT_API_NAME>-testSpec.yaml\".",
                  args: {
                    name: "output-file",
                    template: "filepaths"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "preview",
          description: "Interact with an agent to preview how it responds to your statements, questions, and commands (utterances).",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--api-name",
                "-n"
              ],
              description: "API name of the activated published agent you want to interact with.",
              args: {
                name: "api-name"
              }
            },
            {
              name: "--authoring-bundle",
              description: "API name of the authoring bundle metadata component that contains the agent's Agent Script file.",
              args: {
                name: "authoring-bundle"
              }
            },
            {
              name: [
                "--output-dir",
                "-d"
              ],
              description: "Directory where conversation transcripts are saved.",
              args: {
                name: "output-dir",
                template: "filepaths"
              }
            },
            {
              name: [
                "--apex-debug",
                "-x"
              ],
              description: "Enable Apex debug logging during the agent preview conversation."
            },
            {
              name: "--use-live-actions",
              description: "Use real actions in the org; if not specified, preview uses AI to simulate (mock) actions."
            }
          ],
          subcommands: [
            {
              name: "end",
              description: "End an existing programmatic agent preview session and get trace location.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--session-id",
                  description: "Session ID outputted by \"agent preview start\". Not required when the agent has exactly one active session. Run \"agent preview sessions\" to see the list of all sessions.",
                  args: {
                    name: "session-id"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the activated published agent you want to preview.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--authoring-bundle",
                  description: "API name of the authoring bundle metadata component that contains the agent's Agent Script file.",
                  args: {
                    name: "authoring-bundle"
                  }
                },
                {
                  name: "--all",
                  description: "End all active preview sessions. Combine with --api-name or --authoring-bundle to limit to a specific agent, or use with only --target-org to end sessions for all agents found in the local session cache. Requires --target-org."
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt for confirmation before ending sessions. Has an effect only when used with --all."
                }
              ]
            },
            {
              name: "send",
              description: "Send a message to an existing agent preview session.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--session-id",
                  description: "Session ID outputted by \"agent preview start\". Not required when the agent has exactly one active session. Run \"agent preview sessions\" to see list of all sessions.",
                  args: {
                    name: "session-id"
                  }
                },
                {
                  name: [
                    "--utterance",
                    "-u"
                  ],
                  description: "Utterance to send to the agent, enclosed in double quotes.",
                  args: {
                    name: "utterance"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the activated published agent you want to preview.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--authoring-bundle",
                  description: "API name of the authoring bundle metadata component that contains the agent's Agent Script file.",
                  args: {
                    name: "authoring-bundle"
                  }
                }
              ]
            },
            {
              name: "sessions",
              description: "List all known programmatic agent preview sessions."
            },
            {
              name: "start",
              description: "Start a programmatic agent preview session.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the activated published agent you want to preview.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--authoring-bundle",
                  description: "API name of the authoring bundle metadata component that contains the agent's Agent Script file.",
                  args: {
                    name: "authoring-bundle"
                  }
                },
                {
                  name: "--use-live-actions",
                  description: "Execute real actions in the org (Apex classes, flows, etc.). Required with --authoring-bundle."
                },
                {
                  name: "--simulate-actions",
                  description: "Use AI to simulate action execution instead of calling real actions. Required with --authoring-bundle."
                }
              ]
            }
          ]
        },
        {
          name: "publish",
          subcommands: [
            {
              name: "authoring-bundle",
              description: "Publish an authoring bundle to your org, which results in a new agent or a new version of an existing agent.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the authoring bundle you want to publish; if not specified, the command provides a list that you can choose from.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--skip-retrieve",
                  description: "Don't retrieve the metadata associated with the agent to your DX project."
                },
                {
                  name: [
                    "--verbose",
                    "-v"
                  ],
                  description: "Display detailed output showing all metadata components retrieved and deployed during the publish process."
                },
                {
                  name: "--concise",
                  description: "Display minimal output with only essential information about the publish operation."
                }
              ]
            }
          ]
        },
        {
          name: "test",
          subcommands: [
            {
              name: "create",
              description: "Create an agent test in your org using a local test spec YAML file.",
              options: [
                {
                  name: "--api-name",
                  description: "API name of the new test; the API name must not exist in the org.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--spec",
                  description: "Path to the test spec YAML file.",
                  args: {
                    name: "spec",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--preview",
                  description: "Preview the test metadata file (AiEvaluationDefinition) without deploying to your org."
                },
                {
                  name: "--force-overwrite",
                  description: "Don't prompt for confirmation when overwriting an existing test (based on API name) in your org."
                }
              ]
            },
            {
              name: "list",
              description: "List the available agent tests in your org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "results",
              description: "Get the results of a completed agent test run.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the completed agent test run.",
                  args: {
                    name: "job-id"
                  },
                  isRequired: true
                },
                {
                  name: "--result-format",
                  description: "Format of the agent test run results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "json",
                      "human",
                      "junit",
                      "tap"
                    ]
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory to write the agent test results into.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--test-runner",
                  description: "Explicitly specify which test runner to use (agentforce-studio or testing-center).",
                  args: {
                    name: "test-runner",
                    suggestions: [
                      "agentforce-studio",
                      "testing-center"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Show generated data in the test results output."
                }
              ]
            },
            {
              name: "resume",
              description: "Resume an agent test that you previously started in your org so you can view the test results.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the original agent test run.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recent agent test run."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results to the terminal window.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--result-format",
                  description: "Format of the agent test run results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "json",
                      "human",
                      "junit",
                      "tap"
                    ]
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory to write the agent test results into.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--test-runner",
                  description: "Explicitly specify which test runner to use (agentforce-studio or testing-center).",
                  args: {
                    name: "test-runner",
                    suggestions: [
                      "agentforce-studio",
                      "testing-center"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Show generated data in the test results output."
                }
              ]
            },
            {
              name: "run",
              description: "Start an agent test in your org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the agent test to run; corresponds to the name of the AiEvaluationDefinition metadata component that implements the agent test.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results to the terminal window.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--result-format",
                  description: "Format of the agent test run results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "json",
                      "human",
                      "junit",
                      "tap"
                    ]
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory to write the agent test results into.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--test-runner",
                  description: "Explicitly specify which test runner to use (agentforce-studio or testing-center).",
                  args: {
                    name: "test-runner",
                    suggestions: [
                      "agentforce-studio",
                      "testing-center"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Show generated data in the test results output."
                }
              ]
            },
            {
              name: "run-eval",
              description: "Run rich evaluation tests against an Agentforce agent.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--spec",
                    "-s"
                  ],
                  description: "Path to test spec file (YAML or JSON). Supports reading from stdin when piping content.",
                  args: {
                    name: "spec",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "Agent API name (also called DeveloperName) used to resolve agent_id and agent_version_id. Auto-inferred from the YAML spec's subjectName.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--result-format",
                  description: "Format of the agent test run results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "json",
                      "human",
                      "junit",
                      "tap"
                    ]
                  }
                },
                {
                  name: "--batch-size",
                  description: "Number of tests per API request (max 5).",
                  args: {
                    name: "batch-size",
                    template: "filepaths"
                  }
                },
                {
                  name: "--no-normalize",
                  description: "Disable auto-normalization of field names and shorthand references."
                }
              ]
            }
          ]
        },
        {
          name: "trace",
          subcommands: [
            {
              name: "delete",
              description: "Delete trace files from an agent preview session.",
              options: [
                {
                  name: [
                    "--agent",
                    "-a"
                  ],
                  description: "API name of the agent used to filter the list of trace files you want to delete. Matches against the API name used when starting the session, either an authoring bundle or a published agent API name.",
                  args: {
                    name: "agent"
                  }
                },
                {
                  name: "--session-id",
                  description: "Session ID used to filter the list of trace files you want to delete. Use the \"agent preview sessions\" CLI command to list all known agent preview sessions along with their session IDs.",
                  args: {
                    name: "session-id"
                  }
                },
                {
                  name: "--older-than",
                  description: "Duration used to filter the list of trace files; only files older than the duration are deleted. Accepts a number followed by a unit: m/minutes, h/hours, d/days, w/weeks. Examples: 7d, 24h, 2w.",
                  args: {
                    name: "older-than"
                  }
                },
                {
                  name: "--no-prompt",
                  description: "Skip the confirmation prompt and delete immediately."
                }
              ]
            },
            {
              name: "list",
              description: "List the available trace files that were recorded during all agent preview sessions.",
              options: [
                {
                  name: "--session-id",
                  description: "Session ID used to filter the list of trace files. Use the \"agent preview sessions\" CLI command to list all known agent preview sessions along with their session IDs.",
                  args: {
                    name: "session-id"
                  }
                },
                {
                  name: [
                    "--agent",
                    "-a"
                  ],
                  description: "API name of the agent used to filter the list of available trace files. Matches against the API name used when starting the session, either an authoring bundle or a published agent API name.",
                  args: {
                    name: "agent"
                  }
                },
                {
                  name: "--since",
                  description: "Date used to filter the list of trace files; only those recorded on or after the date are listed.",
                  args: {
                    name: "since"
                  }
                }
              ]
            },
            {
              name: "read",
              description: "Read trace files from an agent preview session.",
              options: [
                {
                  name: [
                    "--session-id",
                    "-s"
                  ],
                  description: "Session ID to read traces for. Use the \"agent preview sessions\" CLI command to list all known agent preview sessions along with their session IDs",
                  args: {
                    name: "session-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--format",
                    "-f"
                  ],
                  description: "Output format of the trace data; specifies the level of detail you want in the trace files.",
                  args: {
                    name: "format",
                    suggestions: [
                      "summary",
                      "detail",
                      "raw"
                    ]
                  }
                },
                {
                  name: [
                    "--dimension",
                    "-d"
                  ],
                  description: "Dimension to drill into when using \"--format detail\"; used to filter and organize the trace data to answer a specific type of question.",
                  args: {
                    name: "dimension",
                    suggestions: [
                      "actions",
                      "grounding",
                      "routing",
                      "errors"
                    ]
                  }
                },
                {
                  name: [
                    "--turn",
                    "-t"
                  ],
                  description: "Turn number for which you want trace data. A turn is a single utterance or response in a conversation, starting with 1.",
                  args: {
                    name: "turn"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "validate",
          subcommands: [
            {
              name: "authoring-bundle",
              description: "Validate an authoring bundle to ensure its Agent Script file compiles successfully and can be used to publish an agent.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name of the authoring bundle you want to validate; if not specified, the command provides a list that you can choose from.",
                  args: {
                    name: "api-name"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "alias",
      subcommands: [
        {
          name: "list",
          description: "List all aliases currently set on your local computer."
        },
        {
          name: "set",
          description: "Set one or more aliases on your local computer."
        },
        {
          name: "unset",
          description: "Unset one or more aliases that are currently set on your local computer.",
          options: [
            {
              name: [
                "--all",
                "-a"
              ],
              description: "Unset all currently set aliases."
            },
            {
              name: [
                "--no-prompt",
                "-p"
              ],
              description: "Don't prompt the user for confirmation when unsetting all aliases."
            }
          ]
        }
      ]
    },
    {
      name: "apex",
      subcommands: [
        {
          name: "get",
          subcommands: [
            {
              name: "log",
              description: "Fetch the specified log or given number of most recent logs from the org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--log-id",
                    "-i"
                  ],
                  description: "ID of the specific log to display.",
                  args: {
                    name: "log-id"
                  }
                },
                {
                  name: [
                    "--number",
                    "-n"
                  ],
                  description: "Number of the most recent logs to display.",
                  args: {
                    name: "number"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory for saving the log files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                }
              ]
            },
            {
              name: "test",
              description: "Display test results for a specific asynchronous test run.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--test-run-id",
                    "-i"
                  ],
                  description: "ID of the test run.",
                  args: {
                    name: "test-run-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: "--detailed-coverage",
                  description: "Display detailed code coverage per test."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test result files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                }
              ]
            }
          ]
        },
        {
          name: "list",
          subcommands: [
            {
              name: "log",
              description: "Display a list of IDs and general information about debug logs.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "run",
          description: "Execute anonymous Apex code entered on the command line or from a local file.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--file",
                "-f"
              ],
              description: "Path to a local file that contains Apex code.",
              args: {
                name: "file",
                template: "filepaths"
              }
            }
          ],
          subcommands: [
            {
              name: "test",
              description: "Invoke Apex tests in an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test run files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Level of tests to run; default is RunLocalTests.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "RunLocalTests",
                      "RunAllTestsInOrg",
                      "RunSpecifiedTests"
                    ]
                  }
                },
                {
                  name: [
                    "--class-names",
                    "-n"
                  ],
                  description: "Apex test class names to run; default is all classes.",
                  args: {
                    name: "class-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: [
                    "--suite-names",
                    "-s"
                  ],
                  description: "Apex test suite names to run.",
                  args: {
                    name: "suite-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--tests",
                    "-t"
                  ],
                  description: "Apex test class names or IDs and, if applicable, test methods to run; default is all tests.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--poll-interval",
                    "-i"
                  ],
                  description: "Number of seconds to wait between retries.",
                  args: {
                    name: "poll-interval"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Sets the streaming client socket timeout in minutes; specify a longer wait time if timeouts occur frequently.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--synchronous",
                    "-y"
                  ],
                  description: "Runs test methods from a single Apex class synchronously; if not specified, tests are run asynchronously."
                },
                {
                  name: [
                    "--detailed-coverage",
                    "-v"
                  ],
                  description: "Display detailed code coverage per test."
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                }
              ]
            }
          ]
        },
        {
          name: "tail",
          subcommands: [
            {
              name: "log",
              description: "Activate debug logging and display logs in the terminal.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--color",
                    "-c"
                  ],
                  description: "Apply default colors to noteworthy log lines."
                },
                {
                  name: [
                    "--debug-level",
                    "-d"
                  ],
                  description: "Debug level to set on the DEVELOPER_LOG trace flag for your user.",
                  args: {
                    name: "debug-level"
                  }
                },
                {
                  name: [
                    "--skip-trace-flag",
                    "-s"
                  ],
                  description: "Skip trace flag setup. Assumes that a trace flag and debug level are fully set up."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "api",
      subcommands: [
        {
          name: "request",
          subcommands: [
            {
              name: "graphql",
              description: "Execute a GraphQL statement.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--stream-to-file",
                    "-S"
                  ],
                  description: "Stream responses to a file.",
                  args: {
                    name: "stream-to-file"
                  }
                },
                {
                  name: [
                    "--include",
                    "-i"
                  ],
                  description: "Include the HTTP response status and headers in the output."
                },
                {
                  name: "--body",
                  description: "File or content with the GraphQL statement. Specify \"-\" to read from standard input.",
                  args: {
                    name: "body"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "rest",
              description: "Make an authenticated HTTP request using the Salesforce REST API.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--include",
                    "-i"
                  ],
                  description: "Include the HTTP response status and headers in the output."
                },
                {
                  name: [
                    "--method",
                    "-X"
                  ],
                  description: "HTTP method for the request.",
                  args: {
                    name: "method",
                    suggestions: [
                      "GET",
                      "POST",
                      "PUT",
                      "PATCH",
                      "HEAD",
                      "DELETE",
                      "OPTIONS",
                      "TRACE"
                    ]
                  }
                },
                {
                  name: [
                    "--header",
                    "-H"
                  ],
                  description: "HTTP header in \"key:value\" format.",
                  args: {
                    name: "header",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "JSON file that contains values for the request header, body, method, and URL.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--stream-to-file",
                    "-S"
                  ],
                  description: "Stream responses to a file.",
                  args: {
                    name: "stream-to-file"
                  }
                },
                {
                  name: [
                    "--body",
                    "-b"
                  ],
                  description: "File or content for the body of the HTTP request. Specify \"-\" to read from standard input or \"\" for an empty body. If passing a file, prefix the filename with '@'.",
                  args: {
                    name: "body"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "autocomplete",
      description: "Display autocomplete installation instructions.",
      options: [
        {
          name: [
            "--refresh-cache",
            "-r"
          ],
          description: "Refresh cache (ignores displaying instructions)"
        }
      ]
    },
    {
      name: "cmdt",
      subcommands: [
        {
          name: "generate",
          subcommands: [
            {
              name: "field",
              description: "Generate a field for a custom metadata type based on the provided field type.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Unique name for the field.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--type",
                    "-f"
                  ],
                  description: "Type of the field.",
                  args: {
                    name: "type",
                    suggestions: [
                      "Checkbox",
                      "Date",
                      "DateTime",
                      "Email",
                      "Number",
                      "Percent",
                      "Phone",
                      "Picklist",
                      "Text",
                      "TextArea",
                      "LongTextArea",
                      "Url"
                    ]
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--picklist-values",
                    "-p"
                  ],
                  description: "Picklist values; required for picklist fields.",
                  args: {
                    name: "picklist-values",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--decimal-places",
                    "-s"
                  ],
                  description: "Number of decimal places to use for number or percent fields.",
                  args: {
                    name: "decimal-places"
                  }
                },
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "Label for the field.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: [
                    "--output-directory",
                    "-d"
                  ],
                  description: "Directory to store newly-created field definition files.",
                  args: {
                    name: "output-directory"
                  }
                }
              ]
            },
            {
              name: "fromorg",
              description: "Generate a custom metadata type and all its records from a Salesforce object.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--dev-name",
                    "-n"
                  ],
                  description: "Name of the custom metadata type.",
                  args: {
                    name: "dev-name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "Label for the custom metadata type.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: [
                    "--plural-label",
                    "-p"
                  ],
                  description: "Plural version of the label value; if blank, uses label.",
                  args: {
                    name: "plural-label"
                  }
                },
                {
                  name: [
                    "--visibility",
                    "-v"
                  ],
                  description: "Who can see the custom metadata type.",
                  args: {
                    name: "visibility",
                    suggestions: [
                      "PackageProtected",
                      "Protected",
                      "Public"
                    ]
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the source Salesforce object used to generate the custom metadata type.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--ignore-unsupported",
                    "-i"
                  ],
                  description: "Ignore unsupported field types."
                },
                {
                  name: [
                    "--type-output-directory",
                    "-d"
                  ],
                  description: "Directory to store newly-created custom metadata type files.",
                  args: {
                    name: "type-output-directory"
                  }
                },
                {
                  name: [
                    "--records-output-dir",
                    "-r"
                  ],
                  description: "Directory to store newly-created custom metadata record files.",
                  args: {
                    name: "records-output-dir"
                  }
                }
              ]
            },
            {
              name: "object",
              description: "Generate a new custom metadata type in the current project.",
              options: [
                {
                  name: [
                    "--type-name",
                    "-n"
                  ],
                  description: "Unique object name for the custom metadata type.",
                  args: {
                    name: "type-name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "Label for the custom metadata type.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: [
                    "--plural-label",
                    "-p"
                  ],
                  description: "Plural version of the label value; if blank, uses label.",
                  args: {
                    name: "plural-label"
                  }
                },
                {
                  name: [
                    "--visibility",
                    "-v"
                  ],
                  description: "Who can see the custom metadata type.",
                  args: {
                    name: "visibility",
                    suggestions: [
                      "PackageProtected",
                      "Protected",
                      "Public"
                    ]
                  }
                },
                {
                  name: [
                    "--output-directory",
                    "-d"
                  ],
                  description: "Directory to store the newly-created custom metadata type files",
                  args: {
                    name: "output-directory"
                  }
                }
              ]
            },
            {
              name: "record",
              description: "Generate a new record for a given custom metadata type in the current project.",
              options: [
                {
                  name: [
                    "--type-name",
                    "-t"
                  ],
                  description: "API name of the custom metadata type to create a record for; must end in \"__mdt\".",
                  args: {
                    name: "type-name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--record-name",
                    "-n"
                  ],
                  description: "Name of the new record.",
                  args: {
                    name: "record-name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "Label for the new record.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: [
                    "--protected",
                    "-p"
                  ],
                  description: "Protect the record when it's in a managed package.",
                  args: {
                    name: "protected",
                    suggestions: [
                      "true",
                      "false"
                    ]
                  }
                },
                {
                  name: [
                    "--input-directory",
                    "-i"
                  ],
                  description: "Directory from which to get the custom metadata type definition from.",
                  args: {
                    name: "input-directory"
                  }
                },
                {
                  name: [
                    "--output-directory",
                    "-d"
                  ],
                  description: "Directory to store newly-created custom metadata record files.",
                  args: {
                    name: "output-directory"
                  }
                }
              ]
            },
            {
              name: "records",
              description: "Generate new custom metadata type records from a CSV file.",
              options: [
                {
                  name: [
                    "--csv",
                    "-f"
                  ],
                  description: "Pathname of the CSV file.",
                  args: {
                    name: "csv"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--type-name",
                    "-t"
                  ],
                  description: "API name of the custom metadata type to create a record for.",
                  args: {
                    name: "type-name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--input-directory",
                    "-i"
                  ],
                  description: "Directory from which to get the custom metadata type definition from.",
                  args: {
                    name: "input-directory"
                  }
                },
                {
                  name: [
                    "--output-directory",
                    "-d"
                  ],
                  description: "Directory to store newly-created custom metadata record files.",
                  args: {
                    name: "output-directory"
                  }
                },
                {
                  name: [
                    "--name-column",
                    "-n"
                  ],
                  description: "Column used to determine the name of the record.",
                  args: {
                    name: "name-column"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "code-analyzer",
      subcommands: [
        {
          name: "config",
          description: "Output the current state of configuration for Code Analyzer.",
          options: [
            {
              name: [
                "--workspace",
                "-w"
              ],
              description: "Set of files that make up your workspace.",
              args: {
                name: "workspace",
                isVariadic: true
              }
            },
            {
              name: [
                "--target",
                "-t"
              ],
              description: "Subset of files within your workspace that you want to target for analysis.",
              args: {
                name: "target",
                isVariadic: true
              }
            },
            {
              name: [
                "--rule-selector",
                "-r"
              ],
              description: "Selection of rules, based on engine name, severity level, rule name, tag, or a combination of criteria separated by colons and commas, and grouped by parentheses.",
              args: {
                name: "rule-selector",
                isVariadic: true
              }
            },
            {
              name: [
                "--config-file",
                "-c"
              ],
              description: "Path to the existing configuration file used to customize the engines and rules.",
              args: {
                name: "config-file",
                template: "filepaths"
              }
            },
            {
              name: [
                "--output-file",
                "-f"
              ],
              description: "Output file to write the configuration state to. The file is written in YAML format.",
              args: {
                name: "output-file",
                template: "filepaths"
              }
            },
            {
              name: "--include-unmodified-rules",
              description: "Include unmodified rules in the rule override settings."
            },
            {
              name: "--no-suppressions",
              description: "Exclude suppressions from the output configuration."
            }
          ]
        },
        {
          name: "rules",
          description: "List the rules that are available to analyze your code.",
          options: [
            {
              name: [
                "--workspace",
                "-w"
              ],
              description: "Set of files that make up your workspace.",
              args: {
                name: "workspace",
                isVariadic: true
              }
            },
            {
              name: [
                "--target",
                "-t"
              ],
              description: "Subset of files within your workspace that you want to target for analysis.",
              args: {
                name: "target",
                isVariadic: true
              }
            },
            {
              name: [
                "--rule-selector",
                "-r"
              ],
              description: "Selection of rules, based on engine name, severity level, rule name, tag, or a combination of criteria separated by colons.",
              args: {
                name: "rule-selector",
                isVariadic: true
              }
            },
            {
              name: [
                "--config-file",
                "-c"
              ],
              description: "Path to the configuration file used to customize the engines and rules.",
              args: {
                name: "config-file",
                template: "filepaths"
              }
            },
            {
              name: [
                "--output-file",
                "-f"
              ],
              description: "Name of the file where the selected rules are written. The file format depends on the extension you specify; the currently supported extensions are .json and .csv",
              args: {
                name: "output-file",
                template: "filepaths",
                isVariadic: true
              }
            },
            {
              name: [
                "--view",
                "-v"
              ],
              description: "Format to display the rules in the terminal.",
              args: {
                name: "view",
                suggestions: [
                  "detail",
                  "table"
                ]
              }
            }
          ]
        },
        {
          name: "run",
          description: "Analyze your code with a selection of rules to ensure good coding practices.",
          options: [
            {
              name: [
                "--workspace",
                "-w"
              ],
              description: "Set of files that make up your workspace.",
              args: {
                name: "workspace",
                isVariadic: true
              }
            },
            {
              name: [
                "--target",
                "-t"
              ],
              description: "Subset of files within your workspace to be targeted for analysis.",
              args: {
                name: "target",
                isVariadic: true
              }
            },
            {
              name: [
                "--rule-selector",
                "-r"
              ],
              description: "Selection of rules, based on engine name, severity level, rule name, tag, or a combination of criteria separated by colons.",
              args: {
                name: "rule-selector",
                isVariadic: true
              }
            },
            {
              name: [
                "--severity-threshold",
                "-s"
              ],
              description: "Severity level of a found violation that must be met or exceeded to cause this command to fail with a non-zero exit code.",
              args: {
                name: "severity-threshold"
              }
            },
            {
              name: [
                "--view",
                "-v"
              ],
              description: "Format to display the command results in the terminal.",
              args: {
                name: "view",
                suggestions: [
                  "detail",
                  "table"
                ]
              }
            },
            {
              name: [
                "--output-file",
                "-f"
              ],
              description: "Name of the file where the analysis results are written. The file format depends on the extension you specify, such as .csv, .html, .xml, and so on.",
              args: {
                name: "output-file",
                template: "filepaths",
                isVariadic: true
              }
            },
            {
              name: [
                "--config-file",
                "-c"
              ],
              description: "Path to the configuration file used to customize the engines and rules.",
              args: {
                name: "config-file",
                template: "filepaths"
              }
            },
            {
              name: "--include-fixes",
              description: "Include fix data for violations when available."
            },
            {
              name: "--include-suggestions",
              description: "Include suggestion data for violations when available."
            },
            {
              name: "--no-suppressions",
              description: "Disable processing of inline and bulk suppression markers."
            }
          ]
        }
      ]
    },
    {
      name: "commands",
      description: "List all sf commands.",
      options: [
        {
          name: [
            "--columns",
            "-c"
          ],
          description: "Only show provided columns (comma-separated).",
          args: {
            name: "columns",
            suggestions: [
              "id",
              "plugin",
              "summary",
              "type"
            ],
            isVariadic: true
          }
        },
        {
          name: "--deprecated",
          description: "Show deprecated commands."
        },
        {
          name: [
            "--extended",
            "-x"
          ],
          description: "Show extra columns."
        },
        {
          name: "--hidden",
          description: "Show hidden commands."
        },
        {
          name: "--no-truncate",
          description: "Do not truncate output."
        },
        {
          name: "--sort",
          description: "Property to sort by.",
          args: {
            name: "sort",
            suggestions: [
              "id",
              "plugin",
              "summary",
              "type"
            ]
          }
        },
        {
          name: "--tree",
          description: "Show tree of commands."
        }
      ]
    },
    {
      name: "community",
      subcommands: [
        {
          name: "create",
          description: "Create an Experience Cloud site using a template.",
          options: [
            {
              name: [
                "--name",
                "-n"
              ],
              description: "Name of the site to create.",
              args: {
                name: "name"
              },
              isRequired: true
            },
            {
              name: [
                "--template-name",
                "-t"
              ],
              description: "Template to use to create a site.",
              args: {
                name: "template-name"
              },
              isRequired: true
            },
            {
              name: [
                "--url-path-prefix",
                "-p"
              ],
              description: "URL to append to the domain created when Digital Experiences was enabled for this org.",
              args: {
                name: "url-path-prefix"
              }
            },
            {
              name: [
                "--description",
                "-d"
              ],
              description: "Description of the site.",
              args: {
                name: "description"
              }
            },
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            }
          ]
        },
        {
          name: "list",
          subcommands: [
            {
              name: "template",
              description: "Retrieve the list of templates available in your org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "publish",
          description: "Publish an Experience Builder site to make it live.",
          options: [
            {
              name: [
                "--name",
                "-n"
              ],
              description: "Name of the Experience Builder site to publish.",
              args: {
                name: "name"
              },
              isRequired: true
            },
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            }
          ]
        }
      ]
    },
    {
      name: "config",
      subcommands: [
        {
          name: "get",
          description: "Get the value of a configuration variable.",
          options: [
            {
              name: "--verbose",
              description: "Display whether the configuration variables are set locally or globally."
            }
          ]
        },
        {
          name: "list",
          description: "List the configuration variables that you've previously set."
        },
        {
          name: "set",
          description: "Set one or more configuration variables, such as your default org.",
          options: [
            {
              name: [
                "--global",
                "-g"
              ],
              description: "Set the configuration variables globally, so they can be used from any Salesforce DX project."
            }
          ]
        },
        {
          name: "unset",
          description: "Unset local or global configuration variables.",
          options: [
            {
              name: [
                "--global",
                "-g"
              ],
              description: "Unset the configuration variables globally."
            }
          ]
        }
      ]
    },
    {
      name: "data",
      subcommands: [
        {
          name: "bulk",
          subcommands: [
            {
              name: "results",
              description: "Get the results of a bulk ingest job that you previously ran.",
              options: [
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the bulk job.",
                  args: {
                    name: "job-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "create",
          subcommands: [
            {
              name: "file",
              description: "Upload a local file to an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--title",
                    "-t"
                  ],
                  description: "New title given to the file (ContentDocument) after it's uploaded.",
                  args: {
                    name: "title"
                  }
                },
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "Path of file to upload.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--parent-id",
                    "-i"
                  ],
                  description: "ID of the record to attach the file to.",
                  args: {
                    name: "parent-id"
                  }
                }
              ]
            },
            {
              name: "record",
              description: "Create and insert a record into a Salesforce or Tooling API object.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce or Tooling API object that you're inserting a record into.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--values",
                    "-v"
                  ],
                  description: "Values for the flags in the form <fieldName>=<value>, separate multiple pairs with spaces.",
                  args: {
                    name: "values"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--use-tooling-api",
                    "-t"
                  ],
                  description: "Use Tooling API so you can insert a record in a Tooling API object."
                }
              ]
            }
          ]
        },
        {
          name: "delete",
          subcommands: [
            {
              name: "bulk",
              description: "Bulk delete records from an org using a CSV file. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "CSV file that contains the IDs of the records to update or delete.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce object, either standard or custom, that you want to update or delete records from.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete before displaying the results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--line-ending",
                  description: "Line ending used in the CSV file. Default value on Windows is `CRLF`; on macOS and Linux it's `LF`.",
                  args: {
                    name: "line-ending",
                    suggestions: [
                      "CRLF",
                      "LF"
                    ]
                  }
                },
                {
                  name: "--hard-delete",
                  description: "Mark the records as immediately eligible for deletion by your org. If you don't specify this flag, the deleted records go into the Recycle Bin."
                }
              ]
            },
            {
              name: "record",
              description: "Deletes a single record from a Salesforce or Tooling API object.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce or Tooling API object that you're deleting a record from.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--record-id",
                    "-i"
                  ],
                  description: "ID of the record you’re deleting.",
                  args: {
                    name: "record-id"
                  }
                },
                {
                  name: [
                    "--where",
                    "-w"
                  ],
                  description: "List of <fieldName>=<value> pairs that identify the record you want to delete.",
                  args: {
                    name: "where"
                  }
                },
                {
                  name: [
                    "--use-tooling-api",
                    "-t"
                  ],
                  description: "Use Tooling API so you can delete a record from a Tooling API object."
                }
              ]
            },
            {
              name: "resume",
              description: "Resume a bulk delete job that you previously started. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the \"target-org\" configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "ID of the job you want to resume.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: "--use-most-recent",
                  description: "Use the ID of the most recently-run bulk job."
                },
                {
                  name: "--wait",
                  description: "Number of minutes to wait for the command to complete before displaying the results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "export",
          subcommands: [
            {
              name: "bulk",
              description: "Bulk export records from an org into a file using a SOQL query. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Time to wait for the command to finish, in minutes.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--query",
                    "-q"
                  ],
                  description: "SOQL query to execute.",
                  args: {
                    name: "query"
                  }
                },
                {
                  name: "--query-file",
                  description: "File that contains the SOQL query.",
                  args: {
                    name: "query-file"
                  }
                },
                {
                  name: "--all-rows",
                  description: "Include records that have been soft-deleted due to a merge or delete. By default, deleted records are not returned."
                },
                {
                  name: "--output-file",
                  description: "File where records are written.",
                  args: {
                    name: "output-file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format to write the results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "csv",
                      "json"
                    ]
                  },
                  isRequired: true
                },
                {
                  name: "--column-delimiter",
                  description: "Column delimiter to be used when writing CSV output. Default is COMMA.",
                  args: {
                    name: "column-delimiter",
                    suggestions: [
                      "BACKQUOTE",
                      "CARET",
                      "COMMA",
                      "PIPE",
                      "SEMICOLON",
                      "TAB"
                    ]
                  }
                },
                {
                  name: "--line-ending",
                  description: "Line ending to be used when writing CSV output. Default value on Windows is is `CRLF`; on macOS and Linux it's `LR`.",
                  args: {
                    name: "line-ending",
                    suggestions: [
                      "LF",
                      "CRLF"
                    ]
                  }
                }
              ]
            },
            {
              name: "resume",
              description: "Resume a bulk export job that you previously started. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the bulk export.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: "--use-most-recent",
                  description: "Use the job ID of the bulk export job that was most recently run."
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "tree",
              description: "Export data from an org into one or more JSON files.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--query",
                    "-q"
                  ],
                  description: "SOQL query, or filepath of a file that contains the query, to retrieve records.",
                  args: {
                    name: "query",
                    isVariadic: true
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--plan",
                    "-p"
                  ],
                  description: "Generate multiple sObject tree files and a plan definition file for aggregated import."
                },
                {
                  name: [
                    "--prefix",
                    "-x"
                  ],
                  description: "Prefix of generated files.",
                  args: {
                    name: "prefix"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to generate the JSON files; default is current directory.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "get",
          subcommands: [
            {
              name: "record",
              description: "Retrieve and display a single record of a Salesforce or Tooling API object.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce or Tooling API object that you're retrieving a record from.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--record-id",
                    "-i"
                  ],
                  description: "ID of the record you’re retrieving.",
                  args: {
                    name: "record-id"
                  }
                },
                {
                  name: [
                    "--where",
                    "-w"
                  ],
                  description: "List of <fieldName>=<value> pairs that identify the record you want to display.",
                  args: {
                    name: "where"
                  }
                },
                {
                  name: [
                    "--use-tooling-api",
                    "-t"
                  ],
                  description: "Use Tooling API so you can retrieve a record from a Tooling API object."
                }
              ]
            }
          ]
        },
        {
          name: "import",
          subcommands: [
            {
              name: "bulk",
              description: "Bulk import records into a Salesforce object from a CSV file. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "CSV file that contains the Salesforce object records you want to import.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce object, either standard or custom, into which you're importing records.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Time to wait for the command to finish, in minutes.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--line-ending",
                  description: "Line ending used in the CSV file. Default value on Windows is `CRLF`; on macOS and Linux it's `LF`.",
                  args: {
                    name: "line-ending",
                    suggestions: [
                      "CRLF",
                      "LF"
                    ]
                  }
                },
                {
                  name: "--column-delimiter",
                  description: "Column delimiter used in the CSV file.",
                  args: {
                    name: "column-delimiter",
                    suggestions: [
                      "BACKQUOTE",
                      "CARET",
                      "COMMA",
                      "PIPE",
                      "SEMICOLON",
                      "TAB"
                    ]
                  }
                }
              ]
            },
            {
              name: "resume",
              description: "Resume a bulk import job that you previously started. Uses Bulk API 2.0.",
              options: [
                {
                  name: "--use-most-recent",
                  description: "Use the job ID of the bulk import job that was most recently run."
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the bulk import.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Time to wait for the command to finish, in minutes.",
                  args: {
                    name: "wait"
                  }
                }
              ]
            },
            {
              name: "tree",
              description: "Import data from one or more JSON files into an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--files",
                    "-f"
                  ],
                  description: "Comma-separated and in-order JSON files that contain the records, in sObject tree format, that you want to insert.",
                  args: {
                    name: "files",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--plan",
                    "-p"
                  ],
                  description: "Plan definition file to insert multiple data files.",
                  args: {
                    name: "plan"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "query",
          description: "Execute a SOQL query.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--query",
                "-q"
              ],
              description: "SOQL query to execute.",
              args: {
                name: "query"
              }
            },
            {
              name: [
                "--file",
                "-f"
              ],
              description: "File that contains the SOQL query.",
              args: {
                name: "file",
                template: "filepaths"
              }
            },
            {
              name: [
                "--use-tooling-api",
                "-t"
              ],
              description: "Use Tooling API so you can run queries on Tooling API objects."
            },
            {
              name: "--all-rows",
              description: "Include deleted records. By default, deleted records are not returned."
            },
            {
              name: [
                "--result-format",
                "-r"
              ],
              description: "Format to display the results; the --json flag overrides this flag.",
              args: {
                name: "result-format",
                suggestions: [
                  "human",
                  "csv",
                  "json"
                ]
              }
            },
            {
              name: "--output-file",
              description: "File where records are written; only CSV and JSON output formats are supported.",
              args: {
                name: "output-file",
                template: "filepaths"
              }
            }
          ]
        },
        {
          name: "resume",
          description: "View the status of a bulk data load job or batch.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--batch-id",
                "-b"
              ],
              description: "ID of the batch whose status you want to view; you must also specify the job ID.",
              args: {
                name: "batch-id"
              }
            },
            {
              name: [
                "--job-id",
                "-i"
              ],
              description: "ID of the job whose status you want to view.",
              args: {
                name: "job-id"
              },
              isRequired: true
            }
          ]
        },
        {
          name: "search",
          description: "Execute a SOSL text-based search query.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--query",
                "-q"
              ],
              description: "SOSL query to execute.",
              args: {
                name: "query"
              }
            },
            {
              name: [
                "--file",
                "-f"
              ],
              description: "File that contains the SOSL query.",
              args: {
                name: "file",
                template: "filepaths"
              }
            },
            {
              name: [
                "--result-format",
                "-r"
              ],
              description: "Format to display the results, or to write to disk if you specify \"csv\".",
              args: {
                name: "result-format",
                suggestions: [
                  "human",
                  "csv",
                  "json"
                ]
              }
            }
          ]
        },
        {
          name: "update",
          subcommands: [
            {
              name: "bulk",
              description: "Bulk update records to an org from a CSV file. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Time to wait for the command to finish, in minutes.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "CSV file that contains the Salesforce object records you want to update.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce object, either standard or custom, which you are updating.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--line-ending",
                  description: "Line ending used in the CSV file. Default value on Windows is `CRLF`; on macOS and Linux it's `LF`.",
                  args: {
                    name: "line-ending",
                    suggestions: [
                      "CRLF",
                      "LF"
                    ]
                  }
                },
                {
                  name: "--column-delimiter",
                  description: "Column delimiter used in the CSV file.",
                  args: {
                    name: "column-delimiter",
                    suggestions: [
                      "BACKQUOTE",
                      "CARET",
                      "COMMA",
                      "PIPE",
                      "SEMICOLON",
                      "TAB"
                    ]
                  }
                }
              ]
            },
            {
              name: "record",
              description: "Updates a single record of a Salesforce or Tooling API object.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce or Tooling API object that contains the record you're updating.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--record-id",
                    "-i"
                  ],
                  description: "ID of the record you’re updating.",
                  args: {
                    name: "record-id"
                  }
                },
                {
                  name: [
                    "--where",
                    "-w"
                  ],
                  description: "List of <fieldName>=<value> pairs that identify the record you want to update.",
                  args: {
                    name: "where"
                  }
                },
                {
                  name: [
                    "--values",
                    "-v"
                  ],
                  description: "Fields that you're updating, in the format of <fieldName>=<value> pairs.",
                  args: {
                    name: "values"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--use-tooling-api",
                    "-t"
                  ],
                  description: "Use Tooling API so you can update a record in a Tooling API object."
                }
              ]
            },
            {
              name: "resume",
              description: "Resume a bulk update job that you previously started. Uses Bulk API 2.0.",
              options: [
                {
                  name: "--use-most-recent",
                  description: "Use the job ID of the bulk update job that was most recently run."
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the bulk update.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Time to wait for the command to finish, in minutes.",
                  args: {
                    name: "wait"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "upsert",
          subcommands: [
            {
              name: "bulk",
              description: "Bulk upsert records to an org from a CSV file. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--file",
                    "-f"
                  ],
                  description: "CSV file that contains the IDs of the records to update or delete.",
                  args: {
                    name: "file",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce object, either standard or custom, that you want to update or delete records from.",
                  args: {
                    name: "sobject"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete before displaying the results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--line-ending",
                  description: "Line ending used in the CSV file. Default value on Windows is `CRLF`; on macOS and Linux it's `LF`.",
                  args: {
                    name: "line-ending",
                    suggestions: [
                      "CRLF",
                      "LF"
                    ]
                  }
                },
                {
                  name: "--column-delimiter",
                  description: "Column delimiter used in the CSV file.",
                  args: {
                    name: "column-delimiter",
                    suggestions: [
                      "BACKQUOTE",
                      "CARET",
                      "COMMA",
                      "PIPE",
                      "SEMICOLON",
                      "TAB"
                    ]
                  }
                },
                {
                  name: [
                    "--external-id",
                    "-i"
                  ],
                  description: "Name of the external ID field, or the Id field.",
                  args: {
                    name: "external-id"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "resume",
              description: "Resume a bulk upsert job that you previously started. Uses Bulk API 2.0.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the \"target-org\" configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "ID of the job you want to resume.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: "--use-most-recent",
                  description: "Use the ID of the most recently-run bulk job."
                },
                {
                  name: "--wait",
                  description: "Number of minutes to wait for the command to complete before displaying the results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "dev",
      subcommands: [
        {
          name: "audit",
          subcommands: [
            {
              name: "messages",
              description: "Audit messages in a plugin's messages directory to locate unused messages and missing messages that have references in source code.",
              options: [
                {
                  name: [
                    "--project-dir",
                    "-p"
                  ],
                  description: "Location of the project where messages are to be audited.",
                  args: {
                    name: "project-dir"
                  }
                },
                {
                  name: [
                    "--messages-dir",
                    "-m"
                  ],
                  description: "Directory that contains the plugin's message files.",
                  args: {
                    name: "messages-dir"
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-s"
                  ],
                  description: "Directory that contains the plugin's source code.",
                  args: {
                    name: "source-dir",
                    template: "filepaths"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "convert",
          subcommands: [
            {
              name: "messages",
              description: "Convert a .json messages file into Markdown.",
              options: [
                {
                  name: [
                    "--project-dir",
                    "-p"
                  ],
                  description: "Location of the project whose messages are to be converted.",
                  args: {
                    name: "project-dir"
                  }
                },
                {
                  name: [
                    "--file-name",
                    "-f"
                  ],
                  description: "Filename to convert.",
                  args: {
                    name: "file-name",
                    isVariadic: true
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "script",
              description: "Convert a script file that contains deprecated sfdx-style commands to use the new sf-style commands instead.",
              options: [
                {
                  name: [
                    "--script",
                    "-s"
                  ],
                  description: "Filepath to the script you want to convert.",
                  args: {
                    name: "script"
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "generate",
          subcommands: [
            {
              name: "command",
              description: "Generate a new sf command.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the new command. Use colons to separate the topic and command names.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: "--force",
                  description: "Overwrite existing files."
                },
                {
                  name: "--dry-run",
                  description: "Display the changes that would be made without writing them to disk."
                },
                {
                  name: "--nuts",
                  description: "Generate a NUT test file for the command."
                },
                {
                  name: "--unit",
                  description: "Generate a unit test file for the command."
                }
              ]
            },
            {
              name: "flag",
              description: "Generate a flag for an existing command.",
              options: [
                {
                  name: [
                    "--dry-run",
                    "-d"
                  ],
                  description: "Print new flag code instead of adding it to the command file."
                }
              ]
            },
            {
              name: "plugin",
              description: "Generate a new sf plugin.",
              options: [
                {
                  name: "--dry-run",
                  description: "Display the changes that would be made without writing them to disk."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "doctor",
      description: "Gather CLI configuration data and run diagnostic tests to discover and report potential problems in your environment.",
      options: [
        {
          name: [
            "--command",
            "-c"
          ],
          description: "Command to run in debug mode; results are written to a log file.",
          args: {
            name: "command"
          }
        },
        {
          name: [
            "--plugin",
            "-p"
          ],
          description: "Specific plugin on which to run diagnostics.",
          args: {
            name: "plugin"
          }
        },
        {
          name: [
            "--output-dir",
            "-d"
          ],
          description: "Directory to save all created files rather than the current working directory.",
          args: {
            name: "output-dir",
            template: "filepaths"
          }
        },
        {
          name: [
            "--create-issue",
            "-i"
          ],
          description: "Create a new issue on our GitHub repo and attach all diagnostic results."
        }
      ]
    },
    {
      name: "flow",
      subcommands: [
        {
          name: "get",
          subcommands: [
            {
              name: "test",
              description: "Display test results for a specific asynchronous test run.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--test-run-id",
                    "-i"
                  ],
                  description: "ID of the test run.",
                  args: {
                    name: "test-run-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: "--detailed-coverage",
                  description: "Not available for flow tests."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test result files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                }
              ]
            }
          ]
        },
        {
          name: "run",
          subcommands: [
            {
              name: "test",
              description: "Invoke flow tests in an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test result files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: [
                    "--synchronous",
                    "-y"
                  ],
                  description: "Run flow tests for one flow synchronously; if not specified, tests are run asynchronously."
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Level of tests to run; default is RunLocalTests.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "RunLocalTests",
                      "RunAllTestsInOrg",
                      "RunSpecifiedTests"
                    ]
                  }
                },
                {
                  name: [
                    "--class-names",
                    "-n"
                  ],
                  description: "Flow names that contain flow tests to run.",
                  args: {
                    name: "class-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--suite-names",
                    "-s"
                  ],
                  description: "Not available for flow tests.",
                  args: {
                    name: "suite-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--tests",
                    "-t"
                  ],
                  description: "Flow test names to run.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "force",
      subcommands: [
        {
          name: "data",
          subcommands: [
            {
              name: "bulk",
              subcommands: [
                {
                  name: "delete",
                  description: "Bulk delete records from an org using a CSV file. Uses Bulk API 1.0.",
                  options: [
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--file",
                        "-f"
                      ],
                      description: "CSV file that contains the IDs of the records to delete.",
                      args: {
                        name: "file",
                        template: "filepaths"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--sobject",
                        "-s"
                      ],
                      description: "API name of the Salesforce object, either standard or custom, that you want to delete records from.",
                      args: {
                        name: "sobject"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for the command to complete before displaying the results.",
                      args: {
                        name: "wait"
                      }
                    }
                  ]
                },
                {
                  name: "status",
                  description: "View the status of a bulk data load job or batch. Uses Bulk API 1.0.",
                  options: [
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--batch-id",
                        "-b"
                      ],
                      description: "ID of the batch whose status you want to view; you must also specify the job ID.",
                      args: {
                        name: "batch-id"
                      }
                    },
                    {
                      name: [
                        "--job-id",
                        "-i"
                      ],
                      description: "ID of the job whose status you want to view.",
                      args: {
                        name: "job-id"
                      },
                      isRequired: true
                    }
                  ]
                },
                {
                  name: "upsert",
                  description: "Bulk upsert records to an org from a CSV file. Uses Bulk API 1.0.",
                  options: [
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--external-id",
                        "-i"
                      ],
                      description: "Name of the external ID field, or the Id field.",
                      args: {
                        name: "external-id"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--file",
                        "-f"
                      ],
                      description: "CSV file that contains the records to upsert.",
                      args: {
                        name: "file",
                        template: "filepaths"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--sobject",
                        "-s"
                      ],
                      description: "API name of the Salesforce object, either standard or custom, that you want to upsert records to.",
                      args: {
                        name: "sobject"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for the command to complete before displaying the results.",
                      args: {
                        name: "wait"
                      }
                    },
                    {
                      name: [
                        "--serial",
                        "-r"
                      ],
                      description: "Run batches in serial mode."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "lightning",
          subcommands: [
            {
              name: "lwc",
              subcommands: [
                {
                  name: "test",
                  subcommands: [
                    {
                      name: "create",
                      description: "creates a Lightning web component test file with boilerplate code inside a __tests__ directory.",
                      options: [
                        {
                          name: [
                            "--filepath",
                            "-f"
                          ],
                          description: "path to Lightning web component .js file to create a test for",
                          args: {
                            name: "filepath"
                          },
                          isRequired: true
                        }
                      ]
                    },
                    {
                      name: "run",
                      description: "invokes Lightning Web Components Jest unit tests.",
                      options: [
                        {
                          name: [
                            "--debug",
                            "-d"
                          ],
                          description: "run tests in debug mode"
                        },
                        {
                          name: "--watch",
                          description: "run tests in watch mode"
                        }
                      ]
                    },
                    {
                      name: "setup",
                      description: "install Jest unit testing tools for Lightning Web Components."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "package",
          subcommands: [
            {
              name: "push-upgrade",
              subcommands: [
                {
                  name: "list",
                  description: "Lists the status of push upgrade requests for a given package.",
                  options: [
                    {
                      name: [
                        "--target-dev-hub",
                        "-v"
                      ],
                      description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                      args: {
                        name: "target-dev-hub",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--package",
                        "-p"
                      ],
                      description: "Package ID (starts with 033) of the package that you want push upgrade information for.",
                      args: {
                        name: "package"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--scheduled-last-days",
                        "-l"
                      ],
                      description: "Number of days in the past for which to display the list of push upgrade requests that were scheduled. Used to filter the list output to only recently scheduled push upgrades.",
                      args: {
                        name: "scheduled-last-days"
                      }
                    },
                    {
                      name: [
                        "--status",
                        "-s"
                      ],
                      description: "Status used to filter the list output Valid values are: Created, Canceled, Pending, In Progress, Failed, or Succeeded",
                      args: {
                        name: "status",
                        suggestions: [
                          "Created",
                          "Cancelled",
                          "Pending",
                          "In Progress",
                          "Failed",
                          "Succeeded"
                        ]
                      }
                    },
                    {
                      name: "--show-push-migrations-only",
                      description: "Display only push upgrade requests for package migrations."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "help",
      description: "Display help for sf.",
      options: [
        {
          name: [
            "--nested-commands",
            "-n"
          ],
          description: "Include all nested commands in the output."
        }
      ]
    },
    {
      name: "info",
      subcommands: [
        {
          name: "releasenotes",
          subcommands: [
            {
              name: "display",
              description: "Display Salesforce CLI release notes on the command line.",
              options: [
                {
                  name: [
                    "--version",
                    "-v"
                  ],
                  description: "CLI version or tag for which to display release notes.",
                  args: {
                    name: "version"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "lightning",
      subcommands: [
        {
          name: "dev",
          subcommands: [
            {
              name: "app",
              description: "Preview a Lightning Experience app locally and in real-time, without deploying it.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the Lightning Experience app to preview.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--device-type",
                    "-t"
                  ],
                  description: "Type of device to display the app preview.",
                  args: {
                    name: "device-type",
                    suggestions: [
                      "desktop",
                      "ios",
                      "android"
                    ]
                  }
                },
                {
                  name: [
                    "--device-id",
                    "-i"
                  ],
                  description: "ID of the mobile device to display the preview if device type is set to `ios` or `android`. The default value is the ID of the first available mobile device.",
                  args: {
                    name: "device-id"
                  }
                }
              ]
            },
            {
              name: "component",
              description: "Preview LWC components in isolation.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of a component to preview.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--client-select",
                    "-c"
                  ],
                  description: "Launch component preview without selecting a component."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "site",
              description: "[Beta] Preview an Experience Builder site locally and in real-time, without deploying it.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the Experience Builder site to preview. It has to match a site name from the current org.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--get-latest",
                    "-l"
                  ],
                  description: "Download the latest version of the specified site from your org, instead of using any local cache."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "logic",
      subcommands: [
        {
          name: "get",
          subcommands: [
            {
              name: "test",
              description: "Get the results of a test run.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--test-run-id",
                    "-i"
                  ],
                  description: "ID of the test run.",
                  args: {
                    name: "test-run-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: "--detailed-coverage",
                  description: "Display detailed code coverage per test."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test result files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                }
              ]
            }
          ]
        },
        {
          name: "run",
          subcommands: [
            {
              name: "test",
              description: "Invoke tests for Apex and Flows in an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Retrieve code coverage results."
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory in which to store test run files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Level of tests to run; default is RunLocalTests.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "RunLocalTests",
                      "RunAllTestsInOrg",
                      "RunSpecifiedTests"
                    ]
                  }
                },
                {
                  name: [
                    "--class-names",
                    "-n"
                  ],
                  description: "Apex test class names to run; default is all classes.",
                  args: {
                    name: "class-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--result-format",
                    "-r"
                  ],
                  description: "Format of the test results.",
                  args: {
                    name: "result-format",
                    suggestions: [
                      "human",
                      "tap",
                      "junit",
                      "json"
                    ]
                  }
                },
                {
                  name: [
                    "--suite-names",
                    "-s"
                  ],
                  description: "Apex test suite names to run.",
                  args: {
                    name: "suite-names",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--tests",
                    "-t"
                  ],
                  description: "Comma-separated list of test names to run. Can include Apex test classes and Flow tests.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Sets the streaming client socket timeout in minutes; specify a longer wait time if timeouts occur frequently.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--synchronous",
                    "-y"
                  ],
                  description: "Runs test methods from a single Apex class synchronously; if not specified, tests are run asynchronously."
                },
                {
                  name: [
                    "--detailed-coverage",
                    "-v"
                  ],
                  description: "Display detailed code coverage per test."
                },
                {
                  name: "--concise",
                  description: "Display only failed test results; works with human-readable output only."
                },
                {
                  name: "--test-category",
                  description: "Category of tests to run, such as Apex or Flow.",
                  args: {
                    name: "test-category",
                    suggestions: [
                      "Apex",
                      "Flow"
                    ],
                    isVariadic: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "org",
      subcommands: [
        {
          name: "assign",
          subcommands: [
            {
              name: "permset",
              description: "Assign a permission set to one or more org users.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Permission set to assign.",
                  args: {
                    name: "name",
                    isVariadic: true
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--on-behalf-of",
                    "-b"
                  ],
                  description: "Username or alias to assign the permission set to.",
                  args: {
                    name: "on-behalf-of",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "permsetlicense",
              description: "Assign a permission set license to one or more org users.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the permission set license to assign.",
                  args: {
                    name: "name",
                    isVariadic: true
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--on-behalf-of",
                    "-b"
                  ],
                  description: "Usernames or alias to assign the permission set license to.",
                  args: {
                    name: "on-behalf-of",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "auth",
          subcommands: [
            {
              name: "show-access-token",
              description: "Show the current access token for an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Skip the security warning and reveal the access token without confirmation."
                }
              ]
            },
            {
              name: "show-sfdx-auth-url",
              description: "Show the SFDX Auth URL for an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Skip the security warning and reveal the SFDX Auth URL without confirmation."
                }
              ]
            },
            {
              name: "show-user-password",
              description: "Show the stored password for an org's user.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Skip the security warning and reveal the password without confirmation."
                }
              ]
            }
          ]
        },
        {
          name: "create",
          subcommands: [
            {
              name: "agent-user",
              description: "Create the default Salesforce user that is used to run an agent.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--base-username",
                  description: "Base username pattern. A unique ID is appended to ensure global uniqueness of the usename.",
                  args: {
                    name: "base-username"
                  }
                },
                {
                  name: "--first-name",
                  description: "First name for the agent user.",
                  args: {
                    name: "first-name"
                  }
                },
                {
                  name: "--last-name",
                  description: "Last name for the agent user.",
                  args: {
                    name: "last-name"
                  }
                }
              ]
            },
            {
              name: "sandbox",
              description: "Create a sandbox org.",
              options: [
                {
                  name: [
                    "--definition-file",
                    "-f"
                  ],
                  description: "Path to a sandbox definition file.",
                  args: {
                    name: "definition-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--set-default",
                    "-s"
                  ],
                  description: "Set the sandbox org as your default org."
                },
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the sandbox org.",
                  args: {
                    name: "alias"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the sandbox org to be ready.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--poll-interval",
                    "-i"
                  ],
                  description: "Number of seconds to wait between retries.",
                  args: {
                    name: "poll-interval"
                  }
                },
                {
                  name: "--async",
                  description: "Request the sandbox creation, but don't wait for it to complete."
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the sandbox org.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: "--source-sandbox-name",
                  description: "Name of the sandbox org to clone.",
                  args: {
                    name: "source-sandbox-name"
                  }
                },
                {
                  name: "--source-id",
                  description: "ID of the sandbox org to clone.",
                  args: {
                    name: "source-id"
                  }
                },
                {
                  name: [
                    "--license-type",
                    "-l"
                  ],
                  description: "Type of sandbox license.",
                  args: {
                    name: "license-type",
                    suggestions: [
                      "Developer",
                      "Developer_Pro",
                      "Partial",
                      "Full"
                    ]
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the production org that contains the sandbox license.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--no-prompt",
                  description: "Don't prompt for confirmation about the sandbox configuration."
                },
                {
                  name: "--no-track-source",
                  description: "Do not use source tracking for this sandbox."
                }
              ]
            },
            {
              name: "scratch",
              description: "Create a scratch org.",
              options: [
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the scratch org.",
                  args: {
                    name: "alias"
                  }
                },
                {
                  name: "--async",
                  description: "Request the org, but don't wait for it to complete."
                },
                {
                  name: [
                    "--set-default",
                    "-d"
                  ],
                  description: "Set the scratch org as your default org"
                },
                {
                  name: [
                    "--definition-file",
                    "-f"
                  ],
                  description: "Path to a scratch org definition file.",
                  args: {
                    name: "definition-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-ancestors",
                    "-c"
                  ],
                  description: "Don't include second-generation managed package (2GP) ancestors in the scratch org."
                },
                {
                  name: [
                    "--edition",
                    "-e"
                  ],
                  description: "Salesforce edition of the scratch org. Overrides the value of the \"edition\" option in the definition file, if set.",
                  args: {
                    name: "edition",
                    suggestions: [
                      "developer",
                      "enterprise",
                      "group",
                      "professional",
                      "partner-developer",
                      "partner-enterprise",
                      "partner-group",
                      "partner-professional"
                    ]
                  }
                },
                {
                  name: [
                    "--snapshot",
                    "-s"
                  ],
                  description: "Name of the snapshot to use when creating this scratch org. Overrides the value of the \"snapshot\" option in the defintion file, if set.",
                  args: {
                    name: "snapshot"
                  }
                },
                {
                  name: [
                    "--no-namespace",
                    "-m"
                  ],
                  description: "Create the scratch org with no namespace, even if the Dev Hub has a namespace."
                },
                {
                  name: [
                    "--duration-days",
                    "-y"
                  ],
                  description: "Number of days before the org expires.",
                  args: {
                    name: "duration-days"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the scratch org to be ready.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--client-id",
                    "-i"
                  ],
                  description: "Consumer key of the Dev Hub connected app.",
                  args: {
                    name: "client-id"
                  }
                },
                {
                  name: [
                    "--track-source",
                    "-t"
                  ],
                  description: "Use source tracking for this scratch org. Set --no-track-source to disable source tracking."
                },
                {
                  name: "--username",
                  description: "Username of the scratch org admin user. Overrides the value of the \"username\" option in the definition file, if set.",
                  args: {
                    name: "username"
                  }
                },
                {
                  name: "--description",
                  description: "Description of the scratch org in the Dev Hub. Overrides the value of the \"description\" option in the definition file, if set.",
                  args: {
                    name: "description"
                  }
                },
                {
                  name: "--name",
                  description: "Name of the org, such as \"Acme Company\". Overrides the value of the \"orgName\" option in the definition file, if set.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: "--release",
                  description: "Release of the scratch org as compared to the Dev Hub release.",
                  args: {
                    name: "release",
                    suggestions: [
                      "preview",
                      "previous"
                    ]
                  }
                },
                {
                  name: "--admin-email",
                  description: "Email address that will be applied to the org's admin user. Overrides the value of the \"adminEmail\" option in the definition file, if set.",
                  args: {
                    name: "admin-email"
                  }
                },
                {
                  name: "--source-org",
                  description: "15-character ID of the org shape that the new scratch org is based on. Overrides the value of the \"sourceOrg\" option in the definition file, if set.",
                  args: {
                    name: "source-org"
                  }
                }
              ]
            },
            {
              name: "shape",
              description: "Create a scratch org configuration (shape) based on the specified source org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "snapshot",
              description: "Create a snapshot of a scratch org.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--source-org",
                    "-o"
                  ],
                  description: "ID or locally authenticated username or alias of scratch org to snapshot.",
                  args: {
                    name: "source-org"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Unique name of snapshot.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--description",
                    "-d"
                  ],
                  description: "Description of snapshot.",
                  args: {
                    name: "description"
                  }
                }
              ]
            },
            {
              name: "user",
              description: "Create a user for a scratch org.",
              options: [
                {
                  name: [
                    "--set-alias",
                    "-a"
                  ],
                  description: "Set an alias for the created username to reference in other CLI commands.",
                  args: {
                    name: "set-alias"
                  }
                },
                {
                  name: [
                    "--definition-file",
                    "-f"
                  ],
                  description: "File path to a user definition file for customizing the new user.",
                  args: {
                    name: "definition-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--set-unique-username",
                    "-s"
                  ],
                  description: "Force the username, if specified in the definition file or at the command line, to be unique by appending the org ID."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "delete",
          subcommands: [
            {
              name: "sandbox",
              description: "Delete a sandbox.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt the user to confirm the deletion."
                }
              ]
            },
            {
              name: "scratch",
              description: "Delete a scratch org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt the user to confirm the deletion."
                }
              ]
            },
            {
              name: "shape",
              description: "Delete all org shapes for a target org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt for confirmation."
                }
              ]
            },
            {
              name: "snapshot",
              description: "Delete a scratch org snapshot.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--snapshot",
                    "-s"
                  ],
                  description: "Name or ID of snapshot to delete.",
                  args: {
                    name: "snapshot"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt the user to confirm the deletion."
                }
              ]
            }
          ]
        },
        {
          name: "disable",
          subcommands: [
            {
              name: "tracking",
              description: "Prevent Salesforce CLI from tracking changes in your source files between your project and an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "display",
          description: "Display information about an org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: "--verbose",
              description: "Display the sfdxAuthUrl property."
            }
          ],
          subcommands: [
            {
              name: "user",
              description: "Display information about a Salesforce user.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "enable",
          subcommands: [
            {
              name: "tracking",
              description: "Allow Salesforce CLI to track changes in your source files between your project and an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "generate",
          subcommands: [
            {
              name: "password",
              description: "Generate a random password for scratch org users.",
              options: [
                {
                  name: [
                    "--on-behalf-of",
                    "-b"
                  ],
                  description: "Comma-separated list of usernames or aliases to assign the password to; must have been created locally with the \"org create user\" command.",
                  args: {
                    name: "on-behalf-of",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--length",
                    "-l"
                  ],
                  description: "Number of characters in the generated password; valid values are between 20 and 100. Default value is 20.",
                  args: {
                    name: "length"
                  }
                },
                {
                  name: [
                    "--complexity",
                    "-c"
                  ],
                  description: "Level of password complexity or strength; the higher the value, the stronger the password.",
                  args: {
                    name: "complexity"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "get",
          subcommands: [
            {
              name: "snapshot",
              description: "Get details about a scratch org snapshot.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--snapshot",
                    "-s"
                  ],
                  description: "Name or ID of snapshot to retrieve.",
                  args: {
                    name: "snapshot"
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "list",
          description: "List all orgs you’ve created or authenticated to.",
          options: [
            {
              name: "--verbose",
              description: "List more information about each org."
            },
            {
              name: "--all",
              description: "Include expired, deleted, and unknown-status scratch orgs."
            },
            {
              name: "--clean",
              description: "Remove all local org authorizations for non-active scratch orgs. Use \"org logout\" to remove non-scratch orgs."
            },
            {
              name: [
                "--no-prompt",
                "-p"
              ],
              description: "Don't prompt for confirmation."
            },
            {
              name: "--skip-connection-status",
              description: "Skip retrieving the connection status of non-scratch orgs."
            }
          ],
          subcommands: [
            {
              name: "auth",
              description: "List authorization information about the orgs you created or logged into."
            },
            {
              name: "limits",
              description: "Display information about limits in your org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "metadata",
              description: "List the metadata components and properties of a specified type.",
              options: [
                {
                  name: "--api-version",
                  description: "API version to use; default is the most recent API version.",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-file",
                    "-f"
                  ],
                  description: "Pathname of the file in which to write the results.",
                  args: {
                    name: "output-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata-type",
                    "-m"
                  ],
                  description: "Metadata type to be retrieved, such as CustomObject; metadata type names are case-sensitive.",
                  args: {
                    name: "metadata-type"
                  },
                  isRequired: true
                },
                {
                  name: "--folder",
                  description: "Folder associated with the component; required for components that use folders; folder names are case-sensitive.",
                  args: {
                    name: "folder"
                  }
                }
              ]
            },
            {
              name: "metadata-types",
              description: "Display details about the metadata types that are enabled for your org.",
              options: [
                {
                  name: "--api-version",
                  description: "API version to use; default is the most recent API version.",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-file",
                    "-f"
                  ],
                  description: "Pathname of the file in which to write the results.",
                  args: {
                    name: "output-file",
                    template: "filepaths"
                  }
                }
              ]
            },
            {
              name: "shape",
              description: "List all org shapes you’ve created."
            },
            {
              name: "snapshot",
              description: "List scratch org snapshots.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "sobject",
              subcommands: [
                {
                  name: "record-counts",
                  description: "Display record counts for the specified standard or custom objects.",
                  options: [
                    {
                      name: [
                        "--sobject",
                        "-s"
                      ],
                      description: "API name of the standard or custom object for which to display record counts.",
                      args: {
                        name: "sobject",
                        isVariadic: true
                      }
                    },
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                }
              ]
            },
            {
              name: "users",
              description: "List all locally-authenticated users of an org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "login",
          subcommands: [
            {
              name: "access-token",
              description: "Authorize an org using an existing Salesforce access token.",
              options: [
                {
                  name: [
                    "--instance-url",
                    "-r"
                  ],
                  description: "URL of the instance that the org lives on.",
                  args: {
                    name: "instance-url"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--set-default-dev-hub",
                    "-d"
                  ],
                  description: "Set the authenticated org as the default Dev Hub."
                },
                {
                  name: [
                    "--set-default",
                    "-s"
                  ],
                  description: "Set the authenticated org as the default that all org-related commands run against."
                },
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the org.",
                  args: {
                    name: "alias"
                  }
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt for confirmation."
                }
              ]
            },
            {
              name: "jwt",
              description: "Log in to a Salesforce org using a JSON web token (JWT).",
              options: [
                {
                  name: [
                    "--username",
                    "-o"
                  ],
                  description: "Username of the user logging in.",
                  args: {
                    name: "username"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--jwt-key-file",
                    "-f"
                  ],
                  description: "Path to a file containing the private key.",
                  args: {
                    name: "jwt-key-file"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--client-id",
                    "-i"
                  ],
                  description: "OAuth client ID (also called consumer key) of your custom connected app.",
                  args: {
                    name: "client-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--instance-url",
                    "-r"
                  ],
                  description: "URL of the instance that the org lives on.",
                  args: {
                    name: "instance-url"
                  }
                },
                {
                  name: [
                    "--set-default-dev-hub",
                    "-d"
                  ],
                  description: "Set the authenticated org as the default Dev Hub."
                },
                {
                  name: [
                    "--set-default",
                    "-s"
                  ],
                  description: "Set the authenticated org as the default that all org-related commands run against."
                },
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the org.",
                  args: {
                    name: "alias"
                  }
                }
              ]
            },
            {
              name: "sfdx-url",
              description: "Authorize an org using a Salesforce DX authorization URL stored in a file or through standard input (stdin).",
              options: [
                {
                  name: [
                    "--sfdx-url-file",
                    "-f"
                  ],
                  description: "Path to a file that contains the Salesforce DX authorization URL.",
                  args: {
                    name: "sfdx-url-file"
                  }
                },
                {
                  name: [
                    "--sfdx-url-stdin",
                    "-u"
                  ],
                  description: "Pipe the Salesforce DX authorization URL through standard input (stdin).",
                  args: {
                    name: "sfdx-url-stdin"
                  }
                },
                {
                  name: [
                    "--set-default-dev-hub",
                    "-d"
                  ],
                  description: "Set the authenticated org as the default Dev Hub."
                },
                {
                  name: [
                    "--set-default",
                    "-s"
                  ],
                  description: "Set the authenticated org as the default that all org-related commands run against."
                },
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the org.",
                  args: {
                    name: "alias"
                  }
                }
              ]
            },
            {
              name: "web",
              description: "Log in to a Salesforce org using the web server flow.",
              options: [
                {
                  name: [
                    "--browser",
                    "-b"
                  ],
                  description: "Browser in which to open the org.",
                  args: {
                    name: "browser",
                    suggestions: [
                      "chrome",
                      "edge",
                      "firefox"
                    ]
                  }
                },
                {
                  name: [
                    "--client-id",
                    "-i"
                  ],
                  description: "OAuth client ID (also called consumer key) of your custom connected app.",
                  args: {
                    name: "client-id"
                  }
                },
                {
                  name: [
                    "--instance-url",
                    "-r"
                  ],
                  description: "URL of the instance that the org lives on.",
                  args: {
                    name: "instance-url"
                  }
                },
                {
                  name: [
                    "--set-default-dev-hub",
                    "-d"
                  ],
                  description: "Set the authenticated org as the default Dev Hub."
                },
                {
                  name: [
                    "--set-default",
                    "-s"
                  ],
                  description: "Set the authenticated org as the default that all org-related commands run against."
                },
                {
                  name: [
                    "--alias",
                    "-a"
                  ],
                  description: "Alias for the org.",
                  args: {
                    name: "alias"
                  }
                },
                {
                  name: [
                    "--client-app",
                    "-c"
                  ],
                  description: "Name to give to the link between the connected app or external client and the already-authenticated user. You can specify any string you want. Must be used with --username.",
                  args: {
                    name: "client-app"
                  }
                },
                {
                  name: "--username",
                  description: "Username of the already-authenticated user to link to the connected app or external client app. Must be used with --client-app.",
                  args: {
                    name: "username"
                  }
                },
                {
                  name: "--scopes",
                  description: "Authentication (OAuth) scopes to request. Use the scope's short name; specify multiple scopes using just one flag instance and separated by spaces: --scopes \"sfap_api chatbot_api\".",
                  args: {
                    name: "scopes"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "logout",
          description: "Log out of a Salesforce org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org.",
              args: {
                name: "target-org",
                generators: orgGenerator
              }
            },
            {
              name: [
                "--client-app",
                "-c"
              ],
              description: "Client app to log out of.",
              args: {
                name: "client-app"
              }
            },
            {
              name: [
                "--all",
                "-a"
              ],
              description: "Include all authenticated orgs."
            },
            {
              name: [
                "--no-prompt",
                "-p"
              ],
              description: "Don't prompt for confirmation."
            }
          ]
        },
        {
          name: "open",
          description: "Open your default scratch org, or another specified org, in a browser.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: "--private",
              description: "Open the org in the default browser using private (incognito) mode."
            },
            {
              name: [
                "--browser",
                "-b"
              ],
              description: "Browser where the org opens.",
              args: {
                name: "browser",
                suggestions: [
                  "chrome",
                  "edge",
                  "firefox"
                ]
              }
            },
            {
              name: [
                "--path",
                "-p"
              ],
              description: "Navigation URL path to open a specific page.",
              args: {
                name: "path",
                template: "filepaths"
              }
            },
            {
              name: [
                "--url-only",
                "-r"
              ],
              description: "Display navigation URL, but don’t launch browser."
            },
            {
              name: [
                "--source-file",
                "-f"
              ],
              description: "Path to ApexPage, FlexiPage, Flow, or Agent metadata to open in the associated Builder.",
              args: {
                name: "source-file"
              }
            }
          ],
          subcommands: [
            {
              name: "agent",
              description: "Open an agent in your org's Agent Builder UI in a browser.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--api-name",
                    "-n"
                  ],
                  description: "API name, also known as developer name, of the agent you want to open in the org's Agent Builder UI.",
                  args: {
                    name: "api-name"
                  }
                },
                {
                  name: "--private",
                  description: "Open the org in the default browser using private (incognito) mode."
                },
                {
                  name: [
                    "--browser",
                    "-b"
                  ],
                  description: "Browser where the org opens.",
                  args: {
                    name: "browser",
                    suggestions: [
                      "chrome",
                      "edge",
                      "firefox"
                    ]
                  }
                },
                {
                  name: [
                    "--url-only",
                    "-r"
                  ],
                  description: "Display navigation URL, but don’t launch browser."
                },
                {
                  name: "--authoring-bundle",
                  description: "API name of the agent to open in Agentforce Builder.",
                  args: {
                    name: "authoring-bundle"
                  }
                },
                {
                  name: "--version",
                  description: "Version number of the agent to open in Agentforce Builder.",
                  args: {
                    name: "version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "refresh",
          subcommands: [
            {
              name: "sandbox",
              description: "Refresh a sandbox org using the sandbox name.",
              options: [
                {
                  name: "--no-auto-activate",
                  description: "Disable auto-activation of the sandbox after a successful refresh."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to poll for sandbox refresh status.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--poll-interval",
                    "-i"
                  ],
                  description: "Number of seconds to wait between status polling requests.",
                  args: {
                    name: "poll-interval"
                  }
                },
                {
                  name: "--source-sandbox-name",
                  description: "Name of the sandbox org that becomes the new source org for the refreshed sandbox.",
                  args: {
                    name: "source-sandbox-name"
                  }
                },
                {
                  name: "--source-id",
                  description: "ID of the sandbox org that becomes the new source org for the refreshed sandbox.",
                  args: {
                    name: "source-id"
                  }
                },
                {
                  name: "--async",
                  description: "Request the sandbox refresh, but don't wait for it to complete."
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the existing sandbox org in your production org that you want to refresh.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: [
                    "--definition-file",
                    "-f"
                  ],
                  description: "Path to a sandbox definition file for overriding its configuration when you refresh it.",
                  args: {
                    name: "definition-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the production org that contains the sandbox license.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--no-prompt",
                  description: "Don't prompt for confirmation about the sandbox refresh."
                }
              ]
            }
          ]
        },
        {
          name: "resume",
          subcommands: [
            {
              name: "sandbox",
              description: "Check the status of a sandbox creation, and log in to it if it's ready.",
              options: [
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the sandbox org to be ready.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the sandbox org.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the incomplete sandbox creation that you want to check the status of.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-l"
                  ],
                  description: "Use the most recent sandbox create request."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the production org that contains the sandbox license.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                }
              ]
            },
            {
              name: "scratch",
              description: "Resume the creation of an incomplete scratch org.",
              options: [
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the incomplete scratch org create that you want to resume.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recent incomplete scratch org."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the scratch org to be ready.",
                  args: {
                    name: "wait"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "package",
      subcommands: [
        {
          name: "convert",
          description: "Convert a managed-released first-generation managed package into a second-generation managed package.",
          options: [
            {
              name: [
                "--target-dev-hub",
                "-v"
              ],
              description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
              args: {
                name: "target-dev-hub",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--package",
                "-p"
              ],
              description: "ID (starts with 033) of the first-generation managed package to convert.",
              args: {
                name: "package"
              },
              isRequired: true
            },
            {
              name: [
                "--installation-key",
                "-k"
              ],
              description: "Installation key for key-protected package.",
              args: {
                name: "installation-key"
              }
            },
            {
              name: [
                "--definition-file",
                "-f"
              ],
              description: "Path to a definition file that contains features and org preferences that the metadata of the package version depends on.",
              args: {
                name: "definition-file",
                template: "filepaths"
              }
            },
            {
              name: [
                "--installation-key-bypass",
                "-x"
              ],
              description: "Bypass the installation key requirement."
            },
            {
              name: [
                "--wait",
                "-w"
              ],
              description: "Minutes to wait for the package version to be created.",
              args: {
                name: "wait"
              }
            },
            {
              name: [
                "--seed-metadata",
                "-m"
              ],
              description: "Directory containing metadata to be deployed prior to conversion.",
              args: {
                name: "seed-metadata"
              }
            },
            {
              name: "--verbose",
              description: "Display verbose command output."
            },
            {
              name: [
                "--patch-version",
                "-a"
              ],
              description: "Specific released patch version to be converted.",
              args: {
                name: "patch-version"
              }
            },
            {
              name: [
                "--code-coverage",
                "-c"
              ],
              description: "Calculate and store the code coverage percentage by running the packaged Apex tests included in this package version."
            }
          ]
        },
        {
          name: "create",
          description: "Create a package.",
          options: [
            {
              name: [
                "--target-dev-hub",
                "-v"
              ],
              description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
              args: {
                name: "target-dev-hub",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--name",
                "-n"
              ],
              description: "Name of the package to create.",
              args: {
                name: "name"
              },
              isRequired: true
            },
            {
              name: [
                "--package-type",
                "-t"
              ],
              description: "Type of package.",
              args: {
                name: "package-type",
                suggestions: [
                  "Managed",
                  "Unlocked"
                ]
              },
              isRequired: true
            },
            {
              name: [
                "--description",
                "-d"
              ],
              description: "Description of the package.",
              args: {
                name: "description"
              }
            },
            {
              name: [
                "--no-namespace",
                "-e"
              ],
              description: "Create the package with no namespace; available only for unlocked packages."
            },
            {
              name: [
                "--path",
                "-r"
              ],
              description: "Path to directory that contains the contents of the package.",
              args: {
                name: "path",
                template: "filepaths"
              },
              isRequired: true
            },
            {
              name: "--org-dependent",
              description: "Depends on unpackaged metadata in the installation org; applies to unlocked packages only."
            },
            {
              name: [
                "--error-notification-username",
                "-o"
              ],
              description: "Active Dev Hub user designated to receive email notifications for package errors.",
              args: {
                name: "error-notification-username"
              }
            }
          ]
        },
        {
          name: "delete",
          description: "Delete a package.",
          options: [
            {
              name: [
                "--target-dev-hub",
                "-v"
              ],
              description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
              args: {
                name: "target-dev-hub",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--no-prompt",
                "-n"
              ],
              description: "Don't prompt before deleting the package."
            },
            {
              name: [
                "--package",
                "-p"
              ],
              description: "ID (starts with 0Ho) or alias of the package to delete.",
              args: {
                name: "package"
              },
              isRequired: true
            }
          ]
        },
        {
          name: "install",
          description: "Install or upgrade a version of a package in the target org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--wait",
                "-w"
              ],
              description: "Number of minutes to wait for installation status.",
              args: {
                name: "wait"
              }
            },
            {
              name: [
                "--installation-key",
                "-k"
              ],
              description: "Installation key for key-protected package (default: null).",
              args: {
                name: "installation-key"
              }
            },
            {
              name: [
                "--publish-wait",
                "-b"
              ],
              description: "Maximum number of minutes to wait for the Subscriber Package Version ID to become available in the target org before canceling the install request.",
              args: {
                name: "publish-wait"
              }
            },
            {
              name: [
                "--no-prompt",
                "-r"
              ],
              description: "Don't prompt for confirmation."
            },
            {
              name: [
                "--package",
                "-p"
              ],
              description: "ID (starts with 04t) or alias of the package version to install.",
              args: {
                name: "package"
              },
              isRequired: true
            },
            {
              name: [
                "--apex-compile",
                "-a"
              ],
              description: "Compile all Apex in the org and package, or only Apex in the package; unlocked packages only.",
              args: {
                name: "apex-compile",
                suggestions: [
                  "all",
                  "package"
                ]
              }
            },
            {
              name: [
                "--security-type",
                "-s"
              ],
              description: "Security access type for the installed package. Available options are AdminsOnly and AllUsers.",
              args: {
                name: "security-type",
                suggestions: [
                  "AllUsers",
                  "AdminsOnly"
                ]
              }
            },
            {
              name: [
                "--upgrade-type",
                "-t"
              ],
              description: "Upgrade type for the package installation; available only for unlocked packages.",
              args: {
                name: "upgrade-type",
                suggestions: [
                  "DeprecateOnly",
                  "Mixed",
                  "Delete"
                ]
              }
            }
          ],
          subcommands: [
            {
              name: "report",
              description: "Retrieve the status of a package installation request.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--request-id",
                    "-i"
                  ],
                  description: "ID of the package install request you want to check; starts with 0Hf.",
                  args: {
                    name: "request-id"
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "installed",
          subcommands: [
            {
              name: "list",
              description: "List the org’s installed packages.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "list",
          description: "List all packages in the Dev Hub org.",
          options: [
            {
              name: [
                "--target-dev-hub",
                "-v"
              ],
              description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
              args: {
                name: "target-dev-hub",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: "--verbose",
              description: "Display extended package detail."
            }
          ]
        },
        {
          name: "push-upgrade",
          subcommands: [
            {
              name: "abort",
              description: "Abort a package push upgrade that has been scheduled. Only push upgrade requests with a status of Created or Pending can be aborted.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--push-request-id",
                    "-i"
                  ],
                  description: "ID of the package push request (starts with 0DV). This ID is returned after the package push-upgrade schedule command completes successfully.",
                  args: {
                    name: "push-request-id"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "list",
              description: "Lists the status of push upgrade requests for a given package.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "Package ID (starts with 033) of the package that you want push upgrade information for.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--scheduled-last-days",
                    "-l"
                  ],
                  description: "Number of days in the past for which to display the list of push upgrade requests that were scheduled. Used to filter the list output to only recently scheduled push upgrades.",
                  args: {
                    name: "scheduled-last-days"
                  }
                },
                {
                  name: [
                    "--status",
                    "-s"
                  ],
                  description: "Status used to filter the list output Valid values are: Created, Canceled, Pending, In Progress, Failed, or Succeeded",
                  args: {
                    name: "status",
                    suggestions: [
                      "Created",
                      "Cancelled",
                      "Pending",
                      "In Progress",
                      "Failed",
                      "Succeeded"
                    ]
                  }
                },
                {
                  name: "--show-push-migrations-only",
                  description: "Display only push upgrade requests for package migrations."
                }
              ]
            },
            {
              name: "report",
              description: "Retrieve the status of a package push upgrade.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--push-request-id",
                    "-i"
                  ],
                  description: "ID of the package push request (starts with 0DV). This ID is returned after the package push-upgrade schedule command completes successfully.",
                  args: {
                    name: "push-request-id"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "schedule",
              description: "Schedule a package push upgrade.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org that owns the package.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 04t) of the package version that the package is being upgraded to. The package version must be an active, non-beta package version.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--start-time",
                    "-t"
                  ],
                  description: "Date and time (UTC) when the push upgrade is processed. Set to the earliest time that you want Salesforce to attempt to start the upgrade.",
                  args: {
                    name: "start-time"
                  }
                },
                {
                  name: [
                    "--org-list",
                    "-l"
                  ],
                  description: "Comma-separated list of subscriber org IDs that need the package upgrade. Either --org-list or --org-file must be specified.",
                  args: {
                    name: "org-list"
                  }
                },
                {
                  name: [
                    "--org-file",
                    "-f"
                  ],
                  description: "Filename of the CSV file that contains the list of subscriber org IDs that need the package upgrade. Either --org-list or --org-file must be specified.",
                  args: {
                    name: "org-file"
                  }
                },
                {
                  name: "--migrate-to-2gp",
                  description: "Upgrade from a first-generation managed package (1GP) to a second-generation managed package (2GP). Required when you’re pushing a 2GP package to orgs with the 1GP version installed."
                }
              ]
            }
          ]
        },
        {
          name: "uninstall",
          description: "Uninstall a second-generation package from the target org.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--wait",
                "-w"
              ],
              description: "Number of minutes to wait for uninstall status.",
              args: {
                name: "wait"
              }
            },
            {
              name: [
                "--package",
                "-p"
              ],
              description: "ID (starts with 04t) or alias of the package version to uninstall.",
              args: {
                name: "package"
              },
              isRequired: true
            }
          ],
          subcommands: [
            {
              name: "report",
              description: "Retrieve the status of a package uninstall request.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--request-id",
                    "-i"
                  ],
                  description: "ID of the package uninstall request you want to check; starts with 06y.",
                  args: {
                    name: "request-id"
                  },
                  isRequired: true
                }
              ]
            }
          ]
        },
        {
          name: "update",
          description: "Update package details.",
          options: [
            {
              name: [
                "--target-dev-hub",
                "-v"
              ],
              description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
              args: {
                name: "target-dev-hub",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--package",
                "-p"
              ],
              description: "ID (starts with 0Ho) or alias of the package to update.",
              args: {
                name: "package"
              },
              isRequired: true
            },
            {
              name: [
                "--name",
                "-n"
              ],
              description: "New name of the package.",
              args: {
                name: "name"
              }
            },
            {
              name: [
                "--description",
                "-d"
              ],
              description: "New description of the package.",
              args: {
                name: "description"
              }
            },
            {
              name: [
                "--error-notification-username",
                "-o"
              ],
              description: "Active Dev Hub user designated to receive email notifications for package errors.",
              args: {
                name: "error-notification-username"
              }
            },
            {
              name: "--enable-app-analytics",
              description: "Enable AppExchange App Analytics usage data collection on this managed package and its components."
            },
            {
              name: [
                "--recommended-version-id",
                "-r"
              ],
              description: "ID of the package version that's installed when subscribers click the Upgrade to Recommended Version option on the Installed Packages page of their org.",
              args: {
                name: "recommended-version-id"
              }
            },
            {
              name: "--skip-ancestor-check",
              description: "Bypass the ancestry check for setting a recommended version."
            }
          ]
        },
        {
          name: "version",
          subcommands: [
            {
              name: "create",
              description: "Create a package version in the Dev Hub org.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--branch",
                    "-b"
                  ],
                  description: "Name of the branch in your source control system that the package version is based on.",
                  args: {
                    name: "branch"
                  }
                },
                {
                  name: [
                    "--code-coverage",
                    "-c"
                  ],
                  description: "Calculate and store the code coverage percentage by running the packaged Apex tests included in this package version."
                },
                {
                  name: [
                    "--definition-file",
                    "-f"
                  ],
                  description: "Path to a definition file similar to scratch org definition file that contains the list of features and org preferences that the metadata of the package version depends on.",
                  args: {
                    name: "definition-file",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--installation-key",
                    "-k"
                  ],
                  description: "Installation key for key-protected package. (either --installation-key or --installation-key-bypass is required)",
                  args: {
                    name: "installation-key"
                  }
                },
                {
                  name: [
                    "--installation-key-bypass",
                    "-x"
                  ],
                  description: "Bypass the installation key requirement. (either --installation-key or --installation-key-bypass is required)"
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 0Ho) or alias of the package to create a version of.",
                  args: {
                    name: "package"
                  }
                },
                {
                  name: [
                    "--path",
                    "-d"
                  ],
                  description: "Path to the directory that contains the contents of the package.",
                  args: {
                    name: "path",
                    template: "filepaths"
                  }
                },
                {
                  name: "--post-install-script",
                  description: "Name of the post-install script; applies to managed packages only.",
                  args: {
                    name: "post-install-script"
                  }
                },
                {
                  name: "--post-install-url",
                  description: "Post-install instructions URL.",
                  args: {
                    name: "post-install-url"
                  }
                },
                {
                  name: "--releasenotes-url",
                  description: "Release notes URL.",
                  args: {
                    name: "releasenotes-url"
                  }
                },
                {
                  name: "--skip-ancestor-check",
                  description: "Override ancestry requirements, which allows you to specify a package ancestor that isn’t the highest released package version."
                },
                {
                  name: "--skip-validation",
                  description: "Skip validation during package version creation; you can’t promote unvalidated package versions."
                },
                {
                  name: "--async-validation",
                  description: "Return a new package version before completing package validations."
                },
                {
                  name: "--generate-pkg-zip",
                  description: "Generate a package ZIP file that you can use for debugging or to examine the package contents."
                },
                {
                  name: [
                    "--tag",
                    "-t"
                  ],
                  description: "Package version’s tag.",
                  args: {
                    name: "tag"
                  }
                },
                {
                  name: "--uninstall-script",
                  description: "Uninstall script name; applies to managed packages only.",
                  args: {
                    name: "uninstall-script"
                  }
                },
                {
                  name: [
                    "--version-description",
                    "-e"
                  ],
                  description: "Description of the package version to be created; overrides the sfdx-project.json value.",
                  args: {
                    name: "version-description"
                  }
                },
                {
                  name: [
                    "--version-name",
                    "-a"
                  ],
                  description: "Name of the package version to be created; overrides the sfdx-project.json value.",
                  args: {
                    name: "version-name"
                  }
                },
                {
                  name: [
                    "--version-number",
                    "-n"
                  ],
                  description: "Version number of the package version to be created; overrides the sfdx-project.json value.",
                  args: {
                    name: "version-number"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the package version to be created.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--language",
                  description: "Language for the package.",
                  args: {
                    name: "language"
                  }
                },
                {
                  name: "--verbose",
                  description: "Display verbose command output."
                }
              ],
              subcommands: [
                {
                  name: "list",
                  description: "List package version creation requests.",
                  options: [
                    {
                      name: [
                        "--target-dev-hub",
                        "-v"
                      ],
                      description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                      args: {
                        name: "target-dev-hub",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--created-last-days",
                        "-c"
                      ],
                      description: "Number of days since the request was created, starting at 00:00:00 of first day to now. Use 0 for today.",
                      args: {
                        name: "created-last-days"
                      }
                    },
                    {
                      name: [
                        "--status",
                        "-s"
                      ],
                      description: "Status of the version creation request, used to filter the list.",
                      args: {
                        name: "status",
                        suggestions: [
                          "Queued",
                          "InProgress",
                          "Success",
                          "Error"
                        ]
                      }
                    },
                    {
                      name: "--show-conversions-only",
                      description: "Filter the list output to display only converted package version."
                    },
                    {
                      name: "--verbose",
                      description: "Displays additional information at a slight performance cost, such as the version name and number for each package version create request."
                    }
                  ]
                },
                {
                  name: "report",
                  description: "Retrieve details about a package version creation request.",
                  options: [
                    {
                      name: [
                        "--target-dev-hub",
                        "-v"
                      ],
                      description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                      args: {
                        name: "target-dev-hub",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--package-create-request-id",
                        "-i"
                      ],
                      description: "ID (starts with 08c) of the package version creation request you want to display.",
                      args: {
                        name: "package-create-request-id"
                      },
                      isRequired: true
                    }
                  ]
                }
              ]
            },
            {
              name: "delete",
              description: "Delete a package version.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--no-prompt",
                    "-n"
                  ],
                  description: "Don’t prompt before deleting the package version."
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 04t) or alias of the package version to delete.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "displayancestry",
              description: "Display the ancestry tree for a 2GP managed package version.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID or alias of the package (starts with 0Ho) or package version (starts with 04t) to display ancestry for.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: "--dot-code",
                  description: "Display the ancestry tree in DOT code."
                },
                {
                  name: "--verbose",
                  description: "Display both the package version ID (starts with 04t) and the version number (major.minor.patch.build) in the ancestry tree."
                }
              ]
            },
            {
              name: "displaydependencies",
              description: "Display the dependency graph for an unlocked or 2GP managed package version.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID or alias of the package version (starts with 04t) or the package version create request (starts with 08c) to display the dependency graph for.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: "--edge-direction",
                  description: "Order (root-first or root-last) in which the dependencies are displayed.",
                  args: {
                    name: "edge-direction",
                    suggestions: [
                      "root-first",
                      "root-last"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Display both the package version ID (starts with 04t) and the version number (major.minor.patch.build) in each node."
                }
              ]
            },
            {
              name: "list",
              description: "List all package versions in the Dev Hub org.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--created-last-days",
                    "-c"
                  ],
                  description: "Number of days since the request was created, starting at 00:00:00 of first day to now. Use 0 for today.",
                  args: {
                    name: "created-last-days"
                  }
                },
                {
                  name: "--concise",
                  description: "Display limited package version details."
                },
                {
                  name: "--show-conversions-only",
                  description: "Filter the list output to display only converted package version."
                },
                {
                  name: [
                    "--modified-last-days",
                    "-m"
                  ],
                  description: "Number of days since the items were modified, starting at 00:00:00 of first day to now. Use 0 for today.",
                  args: {
                    name: "modified-last-days"
                  }
                },
                {
                  name: [
                    "--packages",
                    "-p"
                  ],
                  description: "Comma-delimited list of packages (aliases or 0Ho IDs) to list.",
                  args: {
                    name: "packages"
                  }
                },
                {
                  name: [
                    "--released",
                    "-r"
                  ],
                  description: "Display released versions only (IsReleased=true)."
                },
                {
                  name: [
                    "--branch",
                    "-b"
                  ],
                  description: "Branch in your source control system used to filter the results; only package versions based on the specified branch are listed.",
                  args: {
                    name: "branch"
                  }
                },
                {
                  name: [
                    "--order-by",
                    "-o"
                  ],
                  description: "Package version fields used to order the list.",
                  args: {
                    name: "order-by"
                  }
                },
                {
                  name: "--verbose",
                  description: "Display extended package version details."
                }
              ]
            },
            {
              name: "promote",
              description: "Promote a package version to released.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 04t) or alias of the package version to promote.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-n"
                  ],
                  description: "Don't prompt to confirm setting the package version as released."
                }
              ]
            },
            {
              name: "report",
              description: "Retrieve details about a package version in the Dev Hub org.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 04t) or alias of the package to retrieve details for.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: "--verbose",
                  description: "Display extended package version details."
                }
              ]
            },
            {
              name: "retrieve",
              description: "Retrieve package metadata for a specified package version. Package metadata can be retrieved for only second-generation managed package versions or unlocked packages.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "Subscriber package version ID (starts with 04t).",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Path within your Salesforce DX project directory in which to download the metadata. This directory must be empty.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                }
              ]
            },
            {
              name: "update",
              description: "Update a package version.",
              options: [
                {
                  name: [
                    "--target-dev-hub",
                    "-v"
                  ],
                  description: "Username or alias of the Dev Hub org. Not required if the `target-dev-hub` configuration variable is already set.",
                  args: {
                    name: "target-dev-hub",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package",
                    "-p"
                  ],
                  description: "ID (starts with 04t) or alias of the package to update a version of.",
                  args: {
                    name: "package"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--version-name",
                    "-a"
                  ],
                  description: "New package version name.",
                  args: {
                    name: "version-name"
                  }
                },
                {
                  name: [
                    "--version-description",
                    "-e"
                  ],
                  description: "New package version description.",
                  args: {
                    name: "version-description"
                  }
                },
                {
                  name: [
                    "--branch",
                    "-b"
                  ],
                  description: "New package version branch.",
                  args: {
                    name: "branch"
                  }
                },
                {
                  name: [
                    "--tag",
                    "-t"
                  ],
                  description: "New package version tag.",
                  args: {
                    name: "tag"
                  }
                },
                {
                  name: [
                    "--installation-key",
                    "-k"
                  ],
                  description: "New installation key for key-protected package (default: null)",
                  args: {
                    name: "installation-key"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "package1",
      subcommands: [
        {
          name: "version",
          subcommands: [
            {
              name: "create",
              description: "Create a first-generation package version in the release org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package-id",
                    "-i"
                  ],
                  description: "ID of the metadata package (starts with 033) of which you’re creating a new version.",
                  args: {
                    name: "package-id"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Package version name.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--description",
                    "-d"
                  ],
                  description: "Package version description.",
                  args: {
                    name: "description"
                  }
                },
                {
                  name: [
                    "--version",
                    "-v"
                  ],
                  description: "Package version in major.minor format, for example, 3.2.",
                  args: {
                    name: "version"
                  }
                },
                {
                  name: [
                    "--managed-released",
                    "-m"
                  ],
                  description: "Create a managed package version."
                },
                {
                  name: [
                    "--release-notes-url",
                    "-r"
                  ],
                  description: "Release notes URL.",
                  args: {
                    name: "release-notes-url"
                  }
                },
                {
                  name: [
                    "--post-install-url",
                    "-p"
                  ],
                  description: "Post install URL.",
                  args: {
                    name: "post-install-url"
                  }
                },
                {
                  name: [
                    "--installation-key",
                    "-k"
                  ],
                  description: "Installation key for key-protected package (default: null).",
                  args: {
                    name: "installation-key"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Minutes to wait for the package version to be created (default: 2 minutes).",
                  args: {
                    name: "wait"
                  }
                }
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Retrieve the status of a package version creation request.",
                  options: [
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      },
                      isRequired: true
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--request-id",
                        "-i"
                      ],
                      description: "ID of the PackageUploadRequest (starts with 0HD).",
                      args: {
                        name: "request-id"
                      },
                      isRequired: true
                    }
                  ]
                }
              ]
            },
            {
              name: "display",
              description: "Display details about a first-generation package version.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package-version-id",
                    "-i"
                  ],
                  description: "ID (starts with 04t) of the metadata package version whose details you want to display.",
                  args: {
                    name: "package-version-id"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "list",
              description: "List package versions for the specified first-generation package or for the org.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--package-id",
                    "-i"
                  ],
                  description: "Metadata package ID (starts with 033) whose package versions you want to list.",
                  args: {
                    name: "package-id"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "plugins",
      description: "List installed plugins.",
      options: [
        {
          name: "--core",
          description: "Show core plugins."
        }
      ],
      subcommands: [
        {
          name: "add",
          description: "Installs a plugin into sf.",
          options: [
            {
              name: [
                "--force",
                "-f"
              ],
              description: "Force npm to fetch remote resources even if a local copy exists on disk."
            },
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--silent",
                "-s"
              ],
              description: "Silences npm output."
            },
            {
              name: [
                "--verbose",
                "-v"
              ],
              description: "Show verbose npm output."
            }
          ]
        },
        {
          name: "discover",
          description: "See a list of 3rd-party sf plugins you can install."
        },
        {
          name: "inspect",
          description: "Displays installation properties of a plugin.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        },
        {
          name: "install",
          description: "Installs a plugin into sf.",
          options: [
            {
              name: [
                "--force",
                "-f"
              ],
              description: "Force npm to fetch remote resources even if a local copy exists on disk."
            },
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--silent",
                "-s"
              ],
              description: "Silences npm output."
            },
            {
              name: [
                "--verbose",
                "-v"
              ],
              description: "Show verbose npm output."
            }
          ]
        },
        {
          name: "link",
          description: "Links a plugin into the CLI for development.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: "--install",
              description: "Install dependencies after linking the plugin."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        },
        {
          name: "remove",
          description: "Removes a plugin from the CLI.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        },
        {
          name: "reset",
          description: "Remove all user-installed and linked plugins.",
          options: [
            {
              name: "--hard",
              description: "Delete node_modules and package manager related files in addition to uninstalling plugins."
            },
            {
              name: "--reinstall",
              description: "Reinstall all plugins after uninstalling."
            }
          ]
        },
        {
          name: "trust",
          subcommands: [
            {
              name: "allowlist",
              subcommands: [
                {
                  name: "add",
                  description: "Add plugins to the plugin allowlist.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "The npm name of the plugin to add to the allowlist. Add multiple plugins by specifying the `--name` flag multiple times.",
                      args: {
                        name: "name",
                        isVariadic: true
                      },
                      isRequired: true
                    }
                  ]
                },
                {
                  name: "list",
                  description: "List the plugins on the plugin allowlist."
                },
                {
                  name: "remove",
                  description: "Remove plugins from the plugin allowlist.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "The npm name of the plugin to remove from the allowlist. Remove multiple plugins by specifying the `--name` flag multiple times.",
                      args: {
                        name: "name",
                        isVariadic: true
                      },
                      isRequired: true
                    }
                  ]
                }
              ]
            },
            {
              name: "verify",
              description: "Validate a digital signature.",
              options: [
                {
                  name: [
                    "--npm",
                    "-n"
                  ],
                  description: "Specify the npm name. This can include a tag/version.",
                  args: {
                    name: "npm"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--registry",
                    "-r"
                  ],
                  description: "The registry name. The behavior is the same as npm.",
                  args: {
                    name: "registry"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "uninstall",
          description: "Removes a plugin from the CLI.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        },
        {
          name: "unlink",
          description: "Removes a plugin from the CLI.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        },
        {
          name: "update",
          description: "Update installed plugins.",
          options: [
            {
              name: [
                "--help",
                "-h"
              ],
              description: "Show CLI help."
            },
            {
              name: [
                "--verbose",
                "-v"
              ]
            }
          ]
        }
      ]
    },
    {
      name: "project",
      subcommands: [
        {
          name: "convert",
          subcommands: [
            {
              name: "mdapi",
              description: "Convert metadata retrieved via Metadata API into the source format used in Salesforce DX projects.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--root-dir",
                    "-r"
                  ],
                  description: "Root directory that contains the Metadata API–formatted metadata.",
                  args: {
                    name: "root-dir",
                    template: "filepaths"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory to store your files in after they’re converted to source format; can be an absolute or relative path.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "File path to manifest (package.xml) of metadata types to convert.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata-dir",
                    "-p"
                  ],
                  description: "Root of directory or zip file of metadata formatted files to convert.",
                  args: {
                    name: "metadata-dir",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to convert.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                }
              ]
            },
            {
              name: "source",
              description: "Convert source-formatted files into metadata that you can deploy using Metadata API.",
              options: [
                {
                  name: "--api-version",
                  description: "API Version to use in the generated project's manifest. By default, will use the version from sfdx-project.json",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--root-dir",
                    "-r"
                  ],
                  description: "Source directory other than the default package to convert.",
                  args: {
                    name: "root-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Output directory to store the Metadata API–formatted files in.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--package-name",
                    "-n"
                  ],
                  description: "Name of the package to associate with the metadata-formatted files.",
                  args: {
                    name: "package-name"
                  }
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "Path to the manifest (package.xml) file that specifies the metadata types to convert.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-p"
                  ],
                  description: "Paths to the local source files to convert.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to convert.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                }
              ]
            },
            {
              name: "source-behavior",
              description: "Enable a behavior of your project source files, and then update your Salesforce DX project to implement the behavior.",
              options: [
                {
                  name: [
                    "--behavior",
                    "-b"
                  ],
                  description: "Behavior to enable; the values correspond to the possible values of the \"sourceBehaviorOption\" option in the \"sfdx-project.json\" file.",
                  args: {
                    name: "behavior",
                    suggestions: [
                      "decomposeCustomLabelsBeta2",
                      "decomposeCustomLabelsBeta",
                      "decomposePermissionSetBeta",
                      "decomposePermissionSetBeta2",
                      "decomposeSharingRulesBeta",
                      "decomposeWorkflowBeta",
                      "decomposeExternalServiceRegistrationBeta"
                    ]
                  },
                  isRequired: true
                },
                {
                  name: "--dry-run",
                  description: "Display what the command would do, but don't make any actual changes."
                },
                {
                  name: "--preserve-temp-dir",
                  description: "Don't delete the metadata API format temporary directory that this command creates. Useful for debugging."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                }
              ]
            }
          ]
        },
        {
          name: "delete",
          subcommands: [
            {
              name: "source",
              description: "Delete source from your project and from a non-source-tracked org.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--check-only",
                    "-c"
                  ],
                  description: "Validate delete command but don't delete anything from the org or the local project."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to finish.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--tests",
                  description: "Apex tests to run when --test-level is RunSpecifiedTests.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Deployment Apex testing level.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "NoTestRun",
                      "RunSpecifiedTests",
                      "RunLocalTests",
                      "RunAllTestsInOrg",
                      "RunRelevantTests"
                    ]
                  }
                },
                {
                  name: [
                    "--no-prompt",
                    "-r"
                  ],
                  description: "Don't prompt for delete confirmation."
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata components to delete.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-p"
                  ],
                  description: "Source file paths to delete.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--track-source",
                    "-t"
                  ],
                  description: "If the delete succeeds, update the source tracking information."
                },
                {
                  name: [
                    "--force-overwrite",
                    "-f"
                  ],
                  description: "Ignore conflict warnings and overwrite changes to the org."
                },
                {
                  name: "--verbose",
                  description: "Verbose output of the delete result."
                }
              ]
            },
            {
              name: "tracking",
              description: "Delete all local source tracking information.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt for source tracking override confirmation."
                }
              ]
            }
          ]
        },
        {
          name: "deploy",
          subcommands: [
            {
              name: "cancel",
              description: "Cancel a deploy operation.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                },
                {
                  name: "--async",
                  description: "Run the command asynchronously."
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the deploy operation you want to cancel.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recent deploy operation."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                }
              ]
            },
            {
              name: "pipeline",
              subcommands: [
                {
                  name: "quick",
                  description: "Quickly deploy a validated deployment to an org.",
                  options: [
                    {
                      name: "--async",
                      description: "Run the command asynchronously."
                    },
                    {
                      name: "--concise",
                      description: "Show concise output of the command result."
                    },
                    {
                      name: "--verbose",
                      description: "Show verbose output of the command result."
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for command to complete and display results.",
                      args: {
                        name: "wait"
                      }
                    },
                    {
                      name: [
                        "--devops-center-username",
                        "-c"
                      ],
                      description: "Username or alias of the DevOps Center org.",
                      args: {
                        name: "devops-center-username"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--job-id",
                        "-i"
                      ],
                      description: "Job ID of the validated deployment to quick deploy.",
                      args: {
                        name: "job-id"
                      }
                    },
                    {
                      name: [
                        "--use-most-recent",
                        "-r"
                      ],
                      description: "Use the job ID of the most recently validated deployment."
                    }
                  ]
                },
                {
                  name: "report",
                  description: "Check the status of a pipeline deploy operation.",
                  options: [
                    {
                      name: [
                        "--devops-center-username",
                        "-c"
                      ],
                      description: "Username or alias of the DevOps Center org.",
                      args: {
                        name: "devops-center-username"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--job-id",
                        "-i"
                      ],
                      description: "Job ID of the pipeline deployment to check the status of.",
                      args: {
                        name: "job-id"
                      }
                    },
                    {
                      name: [
                        "--use-most-recent",
                        "-r"
                      ],
                      description: "Use the job ID of the most recent deploy operation."
                    }
                  ]
                },
                {
                  name: "resume",
                  description: "Resume watching a pipeline deploy operation.",
                  options: [
                    {
                      name: [
                        "--devops-center-username",
                        "-c"
                      ],
                      description: "Username or alias of the DevOps Center org.",
                      args: {
                        name: "devops-center-username"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--job-id",
                        "-i"
                      ],
                      description: "Job ID of the pipeline deploy operation you want to resume.",
                      args: {
                        name: "job-id"
                      }
                    },
                    {
                      name: [
                        "--use-most-recent",
                        "-r"
                      ],
                      description: "Use the job ID of the most recent deploy operation."
                    },
                    {
                      name: "--concise",
                      description: "Show concise output of the command result."
                    },
                    {
                      name: "--verbose",
                      description: "Show verbose output of the command result."
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for command to complete and display results.",
                      args: {
                        name: "wait"
                      }
                    }
                  ]
                },
                {
                  name: "start",
                  description: "Deploy changes from a branch to the pipeline stage’s org.",
                  options: [
                    {
                      name: [
                        "--branch-name",
                        "-b"
                      ],
                      description: "Name of the branch in the source control repository that corresponds to the pipeline stage that you want to deploy the changes to.",
                      args: {
                        name: "branch-name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--bundle-version-name",
                        "-v"
                      ],
                      description: "Version name of the bundle.",
                      args: {
                        name: "bundle-version-name"
                      }
                    },
                    {
                      name: [
                        "--deploy-all",
                        "-a"
                      ],
                      description: "Deploy all metadata in the branch to the stage's org."
                    },
                    {
                      name: [
                        "--devops-center-project-name",
                        "-p"
                      ],
                      description: "Name of the DevOps Center project.",
                      args: {
                        name: "devops-center-project-name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--devops-center-username",
                        "-c"
                      ],
                      description: "Username or alias of the DevOps Center org.",
                      args: {
                        name: "devops-center-username"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--tests",
                        "-t"
                      ],
                      description: "Apex tests to run when --test-level is RunSpecifiedTests.",
                      args: {
                        name: "tests",
                        isVariadic: true
                      }
                    },
                    {
                      name: [
                        "--test-level",
                        "-l"
                      ],
                      description: "Deployment Apex testing level.",
                      args: {
                        name: "test-level",
                        suggestions: [
                          "NoTestRun",
                          "RunSpecifiedTests",
                          "RunLocalTests",
                          "RunAllTestsInOrg"
                        ]
                      }
                    },
                    {
                      name: "--async",
                      description: "Run the command asynchronously."
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for command to complete and display results.",
                      args: {
                        name: "wait"
                      }
                    },
                    {
                      name: "--verbose",
                      description: "Show verbose output of the command result."
                    },
                    {
                      name: "--concise",
                      description: "Show concise output of the command result."
                    }
                  ]
                },
                {
                  name: "validate",
                  description: "Perform a validate-only deployment from a branch to the pipeline stage’s org.",
                  options: [
                    {
                      name: [
                        "--branch-name",
                        "-b"
                      ],
                      description: "Name of the branch in the source control repository that corresponds to the pipeline stage that you want to deploy the changes to.",
                      args: {
                        name: "branch-name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--bundle-version-name",
                        "-v"
                      ],
                      description: "Version name of the bundle.",
                      args: {
                        name: "bundle-version-name"
                      }
                    },
                    {
                      name: [
                        "--deploy-all",
                        "-a"
                      ],
                      description: "Deploy all metadata in the branch to the stage's org."
                    },
                    {
                      name: [
                        "--devops-center-project-name",
                        "-p"
                      ],
                      description: "Name of the DevOps Center project.",
                      args: {
                        name: "devops-center-project-name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--devops-center-username",
                        "-c"
                      ],
                      description: "Username or alias of the DevOps Center org.",
                      args: {
                        name: "devops-center-username"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--tests",
                        "-t"
                      ],
                      description: "Apex tests to run when --test-level is RunSpecifiedTests.",
                      args: {
                        name: "tests",
                        isVariadic: true
                      }
                    },
                    {
                      name: [
                        "--test-level",
                        "-l"
                      ],
                      description: "Deployment Apex testing level.",
                      args: {
                        name: "test-level",
                        suggestions: [
                          "NoTestRun",
                          "RunSpecifiedTests",
                          "RunLocalTests",
                          "RunAllTestsInOrg"
                        ]
                      }
                    },
                    {
                      name: "--async",
                      description: "Run the command asynchronously."
                    },
                    {
                      name: [
                        "--wait",
                        "-w"
                      ],
                      description: "Number of minutes to wait for command to complete and display results.",
                      args: {
                        name: "wait"
                      }
                    },
                    {
                      name: "--verbose",
                      description: "Show verbose output of the command result."
                    },
                    {
                      name: "--concise",
                      description: "Show concise output of the command result."
                    }
                  ]
                }
              ]
            },
            {
              name: "preview",
              description: "Preview a deployment to see what will deploy to the org, the potential conflicts, and the ignored files.",
              options: [
                {
                  name: [
                    "--ignore-conflicts",
                    "-c"
                  ],
                  description: "Don't display conflicts in preview of the deployment."
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "Full file path for manifest (package.xml) of components to preview.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to preview.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-d"
                  ],
                  description: "Path to the local source files to preview.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--concise",
                  description: "Show only the changes that will be deployed; omits files that are forceignored."
                }
              ]
            },
            {
              name: "quick",
              description: "Quickly deploy a validated deployment to an org.",
              options: [
                {
                  name: "--async",
                  description: "Run the command asynchronously."
                },
                {
                  name: "--concise",
                  description: "Show concise output of the deploy result."
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the deployment you want to quick deploy.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recently validated deployment."
                },
                {
                  name: "--verbose",
                  description: "Show verbose output of the deploy result."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--api-version",
                    "-a"
                  ],
                  description: "Target API version for the deploy.",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "report",
              description: "Check or poll for the status of a deploy operation.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  }
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the deploy operation you want to check the status of.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recent deploy operation."
                },
                {
                  name: "--coverage-formatters",
                  description: "Format of the code coverage results.",
                  args: {
                    name: "coverage-formatters",
                    suggestions: [
                      "clover",
                      "cobertura",
                      "html-spa",
                      "html",
                      "json",
                      "json-summary",
                      "lcovonly",
                      "none",
                      "teamcity",
                      "text",
                      "text-summary"
                    ],
                    isVariadic: true
                  }
                },
                {
                  name: "--junit",
                  description: "Output JUnit test results."
                },
                {
                  name: "--results-dir",
                  description: "Output directory for code coverage and JUnit results; defaults to the deploy ID.",
                  args: {
                    name: "results-dir"
                  }
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                }
              ]
            },
            {
              name: "resume",
              description: "Resume watching a deploy operation and update source tracking when the deploy completes.",
              options: [
                {
                  name: "--concise",
                  description: "Show concise output of the deploy operation result."
                },
                {
                  name: [
                    "--job-id",
                    "-i"
                  ],
                  description: "Job ID of the deploy operation you want to resume.",
                  args: {
                    name: "job-id"
                  }
                },
                {
                  name: [
                    "--use-most-recent",
                    "-r"
                  ],
                  description: "Use the job ID of the most recent deploy operation."
                },
                {
                  name: "--verbose",
                  description: "Show verbose output of the deploy operation result."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--coverage-formatters",
                  description: "Format of the code coverage results.",
                  args: {
                    name: "coverage-formatters",
                    suggestions: [
                      "clover",
                      "cobertura",
                      "html-spa",
                      "html",
                      "json",
                      "json-summary",
                      "lcovonly",
                      "none",
                      "teamcity",
                      "text",
                      "text-summary"
                    ],
                    isVariadic: true
                  }
                },
                {
                  name: "--junit",
                  description: "Output JUnit test results."
                },
                {
                  name: "--results-dir",
                  description: "Output directory for code coverage and JUnit results; defaults to the deploy ID.",
                  args: {
                    name: "results-dir"
                  }
                }
              ]
            },
            {
              name: "start",
              description: "Deploy metadata to an org from your local project.",
              options: [
                {
                  name: [
                    "--api-version",
                    "-a"
                  ],
                  description: "Target API version for the deploy.",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--async",
                  description: "Run the command asynchronously."
                },
                {
                  name: "--concise",
                  description: "Show concise output of the deploy result."
                },
                {
                  name: "--dry-run",
                  description: "Validate deploy and run Apex tests but don’t save to the org."
                },
                {
                  name: [
                    "--ignore-conflicts",
                    "-c"
                  ],
                  description: "Ignore conflicts and deploy local files, even if they overwrite changes in the org."
                },
                {
                  name: [
                    "--ignore-errors",
                    "-r"
                  ],
                  description: "Ignore any errors and don’t roll back deployment."
                },
                {
                  name: [
                    "--ignore-warnings",
                    "-g"
                  ],
                  description: "Ignore warnings and allow a deployment to complete successfully."
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "Full file path for manifest (package.xml) of components to deploy.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to deploy. Wildcards (`*` ) supported as long as you use quotes, such as `ApexClass:MyClass*`.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: "--metadata-dir",
                  description: "Root of directory or zip file of metadata formatted files to deploy.",
                  args: {
                    name: "metadata-dir"
                  }
                },
                {
                  name: "--single-package",
                  description: "Indicates that the metadata zip file points to a directory structure for a single package."
                },
                {
                  name: [
                    "--source-dir",
                    "-d"
                  ],
                  description: "Path to the local source files to deploy.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--tests",
                    "-t"
                  ],
                  description: "Apex tests to run when --test-level is RunSpecifiedTests.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Deployment Apex testing level.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "NoTestRun",
                      "RunSpecifiedTests",
                      "RunLocalTests",
                      "RunAllTestsInOrg",
                      "RunRelevantTests"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Show verbose output of the deploy result."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: "--purge-on-delete",
                  description: "Specify that deleted components in the destructive changes manifest file are immediately eligible for deletion rather than being stored in the Recycle Bin."
                },
                {
                  name: "--pre-destructive-changes",
                  description: "File path for a manifest (destructiveChangesPre.xml) of components to delete before the deploy.",
                  args: {
                    name: "pre-destructive-changes"
                  }
                },
                {
                  name: "--post-destructive-changes",
                  description: "File path for a manifest (destructiveChangesPost.xml) of components to delete after the deploy.",
                  args: {
                    name: "post-destructive-changes"
                  }
                },
                {
                  name: "--coverage-formatters",
                  description: "Format of the code coverage results.",
                  args: {
                    name: "coverage-formatters",
                    suggestions: [
                      "clover",
                      "cobertura",
                      "html-spa",
                      "html",
                      "json",
                      "json-summary",
                      "lcovonly",
                      "none",
                      "teamcity",
                      "text",
                      "text-summary"
                    ],
                    isVariadic: true
                  }
                },
                {
                  name: "--junit",
                  description: "Output JUnit test results."
                },
                {
                  name: "--results-dir",
                  description: "Output directory for code coverage and JUnit results; defaults to the deploy ID.",
                  args: {
                    name: "results-dir"
                  }
                }
              ]
            },
            {
              name: "validate",
              description: "Validate a metadata deployment without actually executing it.",
              options: [
                {
                  name: [
                    "--api-version",
                    "-a"
                  ],
                  description: "Target API version for the validation.",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--async",
                  description: "Run the command asynchronously."
                },
                {
                  name: "--concise",
                  description: "Show concise output of the validation result."
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "Full file path for manifest (package.xml) of components to validate for deployment.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to validate for deployment.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-d"
                  ],
                  description: "Path to the local source files to validate for deployment.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: "--metadata-dir",
                  description: "Root of directory or zip file of metadata formatted files to deploy.",
                  args: {
                    name: "metadata-dir"
                  }
                },
                {
                  name: "--single-package",
                  description: "Indicates that the metadata zip file points to a directory structure for a single package."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--tests",
                    "-t"
                  ],
                  description: "Apex tests to run when --test-level is RunSpecifiedTests.",
                  args: {
                    name: "tests",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--test-level",
                    "-l"
                  ],
                  description: "Deployment Apex testing level.",
                  args: {
                    name: "test-level",
                    suggestions: [
                      "RunAllTestsInOrg",
                      "RunLocalTests",
                      "RunSpecifiedTests",
                      "RunRelevantTests"
                    ]
                  }
                },
                {
                  name: "--verbose",
                  description: "Show verbose output of the validation result."
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--ignore-warnings",
                    "-g"
                  ],
                  description: "Ignore warnings and allow a deployment to complete successfully."
                },
                {
                  name: "--coverage-formatters",
                  description: "Format of the code coverage results.",
                  args: {
                    name: "coverage-formatters",
                    suggestions: [
                      "clover",
                      "cobertura",
                      "html-spa",
                      "html",
                      "json",
                      "json-summary",
                      "lcovonly",
                      "none",
                      "teamcity",
                      "text",
                      "text-summary"
                    ],
                    isVariadic: true
                  }
                },
                {
                  name: "--junit",
                  description: "Output JUnit test results."
                },
                {
                  name: "--results-dir",
                  description: "Output directory for code coverage and JUnit results; defaults to the deploy ID.",
                  args: {
                    name: "results-dir"
                  }
                },
                {
                  name: "--purge-on-delete",
                  description: "Specify that deleted components in the destructive changes manifest file are immediately eligible for deletion rather than being stored in the Recycle Bin."
                },
                {
                  name: "--pre-destructive-changes",
                  description: "File path for a manifest (destructiveChangesPre.xml) of components to delete before the deploy",
                  args: {
                    name: "pre-destructive-changes"
                  }
                },
                {
                  name: "--post-destructive-changes",
                  description: "File path for a manifest (destructiveChangesPost.xml) of components to delete after the deploy.",
                  args: {
                    name: "post-destructive-changes"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "generate",
          subcommands: [
            {
              name: "manifest",
              description: "Create a project manifest that lists the metadata components you want to deploy or retrieve.",
              options: [
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Names of metadata components to include in the manifest.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--source-dir",
                    "-p"
                  ],
                  description: "Paths to the local source files to include in the manifest.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of a custom manifest file to create.",
                  args: {
                    name: "name"
                  }
                },
                {
                  name: [
                    "--type",
                    "-t"
                  ],
                  description: "Type of manifest to create; the type determines the name of the created file.",
                  args: {
                    name: "type",
                    suggestions: [
                      "pre",
                      "post",
                      "destroy",
                      "package"
                    ]
                  }
                },
                {
                  name: [
                    "--include-packages",
                    "-c"
                  ],
                  description: "Package types (managed, unlocked) whose metadata is included in the manifest; by default, metadata in managed and unlocked packages is excluded. Metadata in unmanaged packages is always included.",
                  args: {
                    name: "include-packages",
                    suggestions: [
                      "managed",
                      "unlocked"
                    ],
                    isVariadic: true
                  }
                },
                {
                  name: "--excluded-metadata",
                  description: "Metadata types to exclude when building a manifest from an org. Specify the name of the type, not the name of a specific component.",
                  args: {
                    name: "excluded-metadata",
                    isVariadic: true
                  }
                },
                {
                  name: "--from-org",
                  description: "Username or alias of the org that contains the metadata components from which to build a manifest.",
                  args: {
                    name: "from-org"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory to save the created manifest.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "list",
          subcommands: [
            {
              name: "ignored",
              description: "Check your local project package directories for forceignored files.",
              options: [
                {
                  name: [
                    "--source-dir",
                    "-p"
                  ],
                  description: "File or directory of files that the command checks for foreceignored files.",
                  args: {
                    name: "source-dir",
                    template: "filepaths"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "reset",
          subcommands: [
            {
              name: "tracking",
              description: "Reset local and remote source tracking.",
              options: [
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--revision",
                    "-r"
                  ],
                  description: "SourceMember revision counter number to reset to.",
                  args: {
                    name: "revision"
                  }
                },
                {
                  name: [
                    "--no-prompt",
                    "-p"
                  ],
                  description: "Don't prompt for source tracking override confirmation."
                }
              ]
            }
          ]
        },
        {
          name: "retrieve",
          subcommands: [
            {
              name: "preview",
              description: "Preview a retrieval to see what will be retrieved from the org, the potential conflicts, and the ignored files.",
              options: [
                {
                  name: [
                    "--ignore-conflicts",
                    "-c"
                  ],
                  description: "Don't display conflicts in the preview of the retrieval."
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: "--concise",
                  description: "Show only the changes that will be retrieved; omits files that are forceignored."
                }
              ]
            },
            {
              name: "start",
              description: "Retrieve metadata from an org to your local project.",
              options: [
                {
                  name: [
                    "--api-version",
                    "-a"
                  ],
                  description: "Target API version for the retrieve.",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: [
                    "--ignore-conflicts",
                    "-c"
                  ],
                  description: "Ignore conflicts and retrieve and save files to your local filesystem, even if they overwrite your local changes."
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "File path for the manifest (package.xml) that specifies the components to retrieve.",
                  args: {
                    name: "manifest",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--metadata",
                    "-m"
                  ],
                  description: "Metadata component names to retrieve. Wildcards (`*`) supported as long as you use quotes, such as `ApexClass:MyClass*`.",
                  args: {
                    name: "metadata",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--package-name",
                    "-n"
                  ],
                  description: "Package names to retrieve. Use of this flag is for reference only; don't use it to retrieve packaged metadata for development.",
                  args: {
                    name: "package-name",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-r"
                  ],
                  description: "Directory root for the retrieved source files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--single-package",
                  description: "Indicates that the zip file points to a directory structure for a single package."
                },
                {
                  name: [
                    "--source-dir",
                    "-d"
                  ],
                  description: "File paths for source to retrieve from the org.",
                  args: {
                    name: "source-dir",
                    template: "filepaths",
                    isVariadic: true
                  }
                },
                {
                  name: [
                    "--target-metadata-dir",
                    "-t"
                  ],
                  description: "Directory that will contain the retrieved metadata format files or ZIP.",
                  args: {
                    name: "target-metadata-dir"
                  }
                },
                {
                  name: [
                    "--target-org",
                    "-o"
                  ],
                  description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
                  args: {
                    name: "target-org",
                    generators: orgGenerator
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--wait",
                    "-w"
                  ],
                  description: "Number of minutes to wait for the command to complete and display results to the terminal window.",
                  args: {
                    name: "wait"
                  }
                },
                {
                  name: [
                    "--unzip",
                    "-z"
                  ],
                  description: "Extract all files from the retrieved zip file."
                },
                {
                  name: "--zip-file-name",
                  description: "File name to use for the retrieved zip file.",
                  args: {
                    name: "zip-file-name"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "schema",
      subcommands: [
        {
          name: "generate",
          subcommands: [
            {
              name: "field",
              description: "Generate metadata source files for a new custom field on a specified object.",
              options: [
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "The field's label.",
                  args: {
                    name: "label"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--object",
                    "-o"
                  ],
                  description: "The directory that contains the object's source files.",
                  args: {
                    name: "object"
                  }
                }
              ]
            },
            {
              name: "platformevent",
              description: "Generate metadata source files for a new platform event.",
              options: [
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "The platform event's label.",
                  args: {
                    name: "label"
                  },
                  isRequired: true
                }
              ]
            },
            {
              name: "sobject",
              description: "Generate metadata source files for a new custom object.",
              options: [
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "The custom object's label.",
                  args: {
                    name: "label"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--use-default-features",
                    "-f"
                  ],
                  description: "Enable all optional features without prompting."
                }
              ]
            },
            {
              name: "tab",
              description: "Generate the metadata source files for a new custom tab on a custom object.",
              options: [
                {
                  name: [
                    "--object",
                    "-o"
                  ],
                  description: "API name of the custom object you're generating a tab for.",
                  args: {
                    name: "object"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--directory",
                    "-d"
                  ],
                  description: "Path to a \"tabs\" directory that will contain the source files for your new tab.",
                  args: {
                    name: "directory"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--icon",
                    "-i"
                  ],
                  description: "Number from 1 to 100 that specifies the color scheme and icon for the custom tab.",
                  args: {
                    name: "icon"
                  },
                  isRequired: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "search",
      description: "Search for a command."
    },
    {
      name: "sobject",
      subcommands: [
        {
          name: "describe",
          description: "Display the metadata for a standard or custom object or a Tooling API object.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--sobject",
                "-s"
              ],
              description: "API name of the object to describe.",
              args: {
                name: "sobject"
              },
              isRequired: true
            },
            {
              name: [
                "--use-tooling-api",
                "-t"
              ],
              description: "Use Tooling API to display metadata for Tooling API objects."
            }
          ]
        },
        {
          name: "list",
          description: "List all Salesforce objects of a specified category.",
          options: [
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: "--api-version",
              description: "Override the api version used for api requests made by this command",
              args: {
                name: "api-version"
              }
            },
            {
              name: [
                "--sobject",
                "-s"
              ],
              description: "Category of objects to list.",
              args: {
                name: "sobject"
              }
            }
          ]
        }
      ]
    },
    {
      name: "template",
      subcommands: [
        {
          name: "generate",
          subcommands: [
            {
              name: "analytics",
              subcommands: [
                {
                  name: "template",
                  description: "Generate a simple Analytics template.",
                  options: [
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the Analytics template.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    }
                  ]
                }
              ]
            },
            {
              name: "apex",
              subcommands: [
                {
                  name: "class",
                  description: "Generate an Apex class.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Apex class.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "ApexException",
                          "ApexUnitTest",
                          "BasicUnitTest",
                          "DefaultApexClass",
                          "InboundEmailService"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                },
                {
                  name: "trigger",
                  description: "Generate an Apex trigger.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Apex trigger",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "ApexTrigger"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--sobject",
                        "-s"
                      ],
                      description: "Salesforce object to generate a trigger on.",
                      args: {
                        name: "sobject"
                      }
                    },
                    {
                      name: [
                        "--event",
                        "-e"
                      ],
                      description: "Events that fire the trigger.",
                      args: {
                        name: "event",
                        suggestions: [
                          "before insert",
                          "before update",
                          "before delete",
                          "after insert",
                          "after update",
                          "after delete",
                          "after undelete"
                        ],
                        isVariadic: true
                      }
                    }
                  ]
                }
              ]
            },
            {
              name: "digital-experience",
              subcommands: [
                {
                  name: "site",
                  description: "Generate an Experience Cloud site.",
                  options: [
                    {
                      name: [
                        "--target-org",
                        "-o"
                      ],
                      description: "Username or alias of the target org.",
                      args: {
                        name: "target-org",
                        generators: orgGenerator
                      }
                    },
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the Experience Cloud site to generate.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template-name",
                        "-t"
                      ],
                      description: "Template to use when generating the site.",
                      args: {
                        name: "template-name",
                        suggestions: [
                          "Build Your Own (LWR)"
                        ]
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--url-path-prefix",
                        "-p"
                      ],
                      description: "URL path prefix for the site; must contain only alphanumeric characters.",
                      args: {
                        name: "url-path-prefix"
                      }
                    },
                    {
                      name: [
                        "--admin-email",
                        "-e"
                      ],
                      description: "Email address for the site administrator. Defaults to the username of the currently authenticated user.",
                      args: {
                        name: "admin-email"
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory to generate the site files in.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    }
                  ]
                }
              ]
            },
            {
              name: "flexipage",
              description: "Generate a FlexiPage, also known as a Lightning page.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the FlexiPage.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--template",
                    "-t"
                  ],
                  description: "Template type for the FlexiPage.",
                  args: {
                    name: "template",
                    suggestions: [
                      "RecordPage",
                      "AppPage",
                      "HomePage"
                    ]
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory for saving the created files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                },
                {
                  name: "--label",
                  description: "Label of this FlexiPage; if not specified, uses the FlexiPage name as the label.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: "--description",
                  description: "Description for the FlexiPage, which provides context about its purpose.",
                  args: {
                    name: "description"
                  }
                },
                {
                  name: [
                    "--sobject",
                    "-s"
                  ],
                  description: "API name of the Salesforce object; required when creating a RecordPage.",
                  args: {
                    name: "sobject"
                  }
                },
                {
                  name: "--primary-field",
                  description: "Primary field for the dynamic highlights header; typically 'Name'. Used only with RecordPage.",
                  args: {
                    name: "primary-field"
                  }
                },
                {
                  name: "--secondary-fields",
                  description: "Secondary fields shown in the dynamic highlights header. Specify multiple fields separated by commas. Maximum of 11 fields. Used only with RecordPage.",
                  args: {
                    name: "secondary-fields",
                    isVariadic: true
                  }
                },
                {
                  name: "--detail-fields",
                  description: "Fields to display in the Details tab. Specify multiple fields separated by commas. Fields are split into two columns. Used only with RecordPage.",
                  args: {
                    name: "detail-fields",
                    isVariadic: true
                  }
                }
              ]
            },
            {
              name: "lightning",
              subcommands: [
                {
                  name: "app",
                  description: "Generate a Lightning App.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Lightning App.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "DefaultLightningApp"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                },
                {
                  name: "component",
                  description: "Generate a bundle for an Aura component or a Lightning web component.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Lightning Component.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "default",
                          "analyticsDashboard",
                          "analyticsDashboardWithStep",
                          "typescript"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: "--type",
                      description: "Type of the component bundle.",
                      args: {
                        name: "type",
                        suggestions: [
                          "aura",
                          "lwc"
                        ]
                      }
                    }
                  ]
                },
                {
                  name: "event",
                  description: "Generate a Lightning Event.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Lightning Event.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "DefaultLightningEvt"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                },
                {
                  name: "interface",
                  description: "Generate a Lightning Interface.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Lightning Interface.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "DefaultLightningIntf"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                },
                {
                  name: "test",
                  description: "Generate a Lightning test.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Lightning Test.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "DefaultLightningTest"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    }
                  ]
                }
              ]
            },
            {
              name: "project",
              description: "Generate a Salesforce DX project.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the generated project.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--template",
                    "-t"
                  ],
                  description: "Template to use for project creation.",
                  args: {
                    name: "template",
                    suggestions: [
                      "standard",
                      "empty",
                      "analytics",
                      "reactinternalapp",
                      "reactexternalapp",
                      "agent"
                    ]
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory for saving the created files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: [
                    "--namespace",
                    "-s"
                  ],
                  description: "Namespace associated with this project and any connected scratch orgs.",
                  args: {
                    name: "namespace"
                  }
                },
                {
                  name: [
                    "--default-package-dir",
                    "-p"
                  ],
                  description: "Default package directory name.",
                  args: {
                    name: "default-package-dir"
                  }
                },
                {
                  name: [
                    "--manifest",
                    "-x"
                  ],
                  description: "Generate a manifest (package.xml) for change-set based development."
                },
                {
                  name: "--lwc-language",
                  description: "Language of the Lightning Web Components. If not specified, \"javascript\" is used.",
                  args: {
                    name: "lwc-language",
                    suggestions: [
                      "javascript",
                      "typescript"
                    ]
                  }
                },
                {
                  name: "--api-version",
                  description: "Will set this version as sourceApiVersion in the sfdx-project.json file",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "static-resource",
              description: "Generate a static resource.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "Name of the generated static resource.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: "--type",
                  description: "Content type (mime type) of the generated static resource.",
                  args: {
                    name: "type"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory for saving the created files.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "ui-bundle",
              description: "Generate a UI bundle, which contains the code and metadata to build a UI experience that uses non-native Salesforce frameworks, such as React.",
              options: [
                {
                  name: [
                    "--name",
                    "-n"
                  ],
                  description: "API name of the generated UI bundle.",
                  args: {
                    name: "name"
                  },
                  isRequired: true
                },
                {
                  name: [
                    "--template",
                    "-t"
                  ],
                  description: "Template to use when creating the files for a specific UI framework.",
                  args: {
                    name: "template",
                    suggestions: [
                      "default",
                      "reactbasic"
                    ]
                  }
                },
                {
                  name: [
                    "--label",
                    "-l"
                  ],
                  description: "Master label for the UI bundle.",
                  args: {
                    name: "label"
                  }
                },
                {
                  name: [
                    "--output-dir",
                    "-d"
                  ],
                  description: "Directory into which the files are created.",
                  args: {
                    name: "output-dir",
                    template: "filepaths"
                  }
                },
                {
                  name: "--api-version",
                  description: "Override the api version used for api requests made by this command",
                  args: {
                    name: "api-version"
                  }
                }
              ]
            },
            {
              name: "visualforce",
              subcommands: [
                {
                  name: "component",
                  description: "Generate a Visualforce Component.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Visualforce Component.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--template",
                        "-t"
                      ],
                      description: "Template to use for file creation.",
                      args: {
                        name: "template",
                        suggestions: [
                          "DefaultVFComponent"
                        ]
                      }
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--label",
                        "-l"
                      ],
                      description: "Visualforce Component label.",
                      args: {
                        name: "label"
                      },
                      isRequired: true
                    }
                  ]
                },
                {
                  name: "page",
                  description: "Generate a Visualforce Page.",
                  options: [
                    {
                      name: [
                        "--name",
                        "-n"
                      ],
                      description: "Name of the generated Visualforce Page.",
                      args: {
                        name: "name"
                      },
                      isRequired: true
                    },
                    {
                      name: [
                        "--output-dir",
                        "-d"
                      ],
                      description: "Directory for saving the created files.",
                      args: {
                        name: "output-dir",
                        template: "filepaths"
                      }
                    },
                    {
                      name: "--api-version",
                      description: "Override the api version used for api requests made by this command",
                      args: {
                        name: "api-version"
                      }
                    },
                    {
                      name: [
                        "--label",
                        "-l"
                      ],
                      description: "Visualforce Page label.",
                      args: {
                        name: "label"
                      },
                      isRequired: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "ui-bundle",
      subcommands: [
        {
          name: "dev",
          description: "Preview a UI bundle locally and in real-time, without deploying it to your org.",
          options: [
            {
              name: [
                "--name",
                "-n"
              ],
              description: "Name of the UI bundle to preview.",
              args: {
                name: "name"
              }
            },
            {
              name: [
                "--url",
                "-u"
              ],
              description: "URL where your developer server runs, such as https://localhost:5173. All UI, static, and hot deployment requests are forwarded to this URL.",
              args: {
                name: "url"
              }
            },
            {
              name: [
                "--port",
                "-p"
              ],
              description: "Local port where the proxy server listens.",
              args: {
                name: "port"
              }
            },
            {
              name: [
                "--target-org",
                "-o"
              ],
              description: "Username or alias of the target org. Not required if the `target-org` configuration variable is already set.",
              args: {
                name: "target-org",
                generators: orgGenerator
              },
              isRequired: true
            },
            {
              name: [
                "--open",
                "-b"
              ],
              description: "Automatically open the proxy server URL in your default browser when the dev server is ready."
            }
          ]
        }
      ]
    },
    {
      name: "update",
      description: "update the sf CLI",
      options: [
        {
          name: [
            "--available",
            "-a"
          ],
          description: "See available versions."
        },
        {
          name: "--force",
          description: "Force a re-download of the requested version."
        },
        {
          name: [
            "--interactive",
            "-i"
          ],
          description: "Interactively select version to install. This is ignored if a channel is provided."
        },
        {
          name: [
            "--verbose",
            "-b"
          ],
          description: "Show more details about the available versions."
        },
        {
          name: [
            "--version",
            "-v"
          ],
          description: "Install a specific version.",
          args: {
            name: "version"
          }
        }
      ]
    },
    {
      name: "version",
      options: [
        {
          name: "--verbose",
          description: "Show additional information about the CLI."
        }
      ]
    },
    {
      name: "whatsnew",
      description: "Display Salesforce CLI release notes on the command line.",
      options: [
        {
          name: [
            "--version",
            "-v"
          ],
          description: "CLI version or tag for which to display release notes.",
          args: {
            name: "version"
          }
        }
      ]
    },
    {
      name: "which",
      description: "Show which plugin a command is in."
    }
  ],
  options: [
    {
      name: [
        "--help",
        "-h"
      ],
      description: "Show help for sf."
    },
    {
      name: "--version",
      description: "Show CLI version."
    }
  ]
};

export default completionSpec;
