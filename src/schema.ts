export const schema = {
  "form": {
    "labelCol": 6,
    "wrapperCol": 12
  },
  "schema": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string | number",
        "title": "Reaction type",
        "x-decorator": "FormItem",
        "x-component": "Radio.Group",
        "enum": [
          {
            "children": [],
            "label": "thermal catalysis",
            "value": "thermal catalysis"
          },
          {
            "children": [],
            "label": "electorcatalysis",
            "value": "electorcatalysis"
          },
          {
            "children": [],
            "label": "photocatalysis",
            "value": "photocatalysis"
          }
        ],
        "x-validator": [],
        "x-component-props": {},
        "x-decorator-props": {
          "labelAlign": "right"
        },
        "name": "type",
        "default": "thermal catalysis",
        "x-designable-id": "d6r2uj9re1c",
        "x-index": 0
      },
      "reaction": {
        "type": "void",
        "x-component": "FormTab",
        "x-component-props": {
          "style": {
            "padding": "0% 0% 0% 0%"
          }
        },
        "name": "reaction",
        "x-designable-id": "6kntadhg1u3",
        "x-index": 1,
        "properties": {
          "zw620gax16z": {
            "type": "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              "tab": "Reactants",
              "style": {
                "padding": "0% 5% 0% 5%"
              }
            },
            "x-designable-id": "zw620gax16z",
            "x-index": 0,
            "properties": {
              "reactants": {
                "type": "object",
                "x-validator": [],
                "name": "reactants",
                "x-designable-id": "v8bwvw76j2v",
                "x-index": 0,
                "properties": {
                  "promoters": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {
                      "showHeader": true
                    },
                    "x-decorator-props": {
                      "layout": "horizontal",
                      "style": {
                        "margin": "0% 0% 0% 0%"
                      }
                    },
                    "x-designable-id": "rzgyyiybglc",
                    "x-index": 0,
                    "name": "promoters",
                    "items": {
                      "type": "object",
                      "x-designable-id": "vrkpt4asp3g",
                      "x-validator": [],
                      "properties": {
                        "name": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Name"
                          },
                          "name": "name",
                          "x-designable-id": "q0pxdugbamn",
                          "x-index": 0,
                          "properties": {
                            "name": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: methane  / CH3OH"
                              },
                              "x-decorator-props": {},
                              "name": "name",
                              "x-designable-id": "4vh9szs7zvp",
                              "x-index": 0
                            }
                          }
                        },
                        "conversion": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Conversion"
                          },
                          "name": "conversion",
                          "x-designable-id": "ossfwxti4t4",
                          "x-index": 1,
                          "properties": {
                            "conversion": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 80.22 %  / >99%  / nearly complete  /  quantitative / trace"
                              },
                              "x-decorator-props": {},
                              "name": "conversion",
                              "x-designable-id": "bst0z3jt3wz",
                              "x-index": 0
                            }
                          }
                        },
                        "b7r701f21nf": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Operations"
                          },
                          "x-designable-id": "b7r701f21nf",
                          "x-index": 2,
                          "properties": {
                            "ji0j9qy3cz0": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "ji0j9qy3cz0",
                              "x-index": 0
                            },
                            "hwlsz74ank7": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveDown",
                              "x-designable-id": "hwlsz74ank7",
                              "x-index": 1
                            },
                            "6jhp7snr6db": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveUp",
                              "x-designable-id": "6jhp7snr6db",
                              "x-index": 2
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "gdw2y7ajrz4": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-component-props": {},
                        "x-designable-id": "gdw2y7ajrz4",
                        "x-index": 0
                      }
                    }
                  },
                  "reactantMixtureRatio": {
                    "type": "string",
                    "title": "Reactant Mixture Ratio",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: CH4:O2:CO2 = 1:1:3"
                    },
                    "x-decorator-props": {
                      "style": {
                        "margin": "20px 0% 0% 0%"
                      }
                    },
                    "name": "reactantMixtureRatio",
                    "x-designable-id": "k3byxmosbl2",
                    "x-index": 1
                  }
                }
              }
            }
          },
          "jh6008hshb1": {
            "type": "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              "tab": "Catalyst",
              "style": {
                "padding": "0% 5% 0% 5%"
              }
            },
            "x-designable-id": "jh6008hshb1",
            "x-index": 1,
            "properties": {
              "catalyst": {
                "type": "object",
                "x-validator": [],
                "x-designable-id": "ahmih5tai1n",
                "x-index": 0,
                "name": "catalyst",
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "Name",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: palladium on carbon  / Pd(OAc)2   /  ZSM-5"
                    },
                    "x-decorator-props": {
                      "tooltip": "名词，或原文相关描述文本。最好是参考摘要和结论的描述"
                    },
                    "x-designable-id": "4zkk5esxcpm",
                    "x-index": 0,
                    "name": "name"
                  },
                  "catalystMixtureRatio": {
                    "type": "string",
                    "title": "Catalyst Mixture Ratio",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 5% Pd on carbon / 20 mol% / 5 wt%"
                    },
                    "x-decorator-props": {
                      "tooltip": "文献中怎么描述就怎么提取"
                    },
                    "x-designable-id": "bsx1kr7ikvb",
                    "x-index": 1,
                    "name": "catalystMixtureRatio"
                  },
                  "promoters": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {
                      "labelWrap": false,
                      "inset": false,
                      "wrapperWrap": false,
                      "fullness": false,
                      "wrapperAlign": "left",
                      "labelAlign": "left",
                      "layout": "vertical",
                      "size": "large"
                    },
                    "x-designable-id": "39g6oqlewo9",
                    "x-index": 2,
                    "title": "Promoters",
                    "name": "promoters",
                    "items": {
                      "type": "object",
                      "x-designable-id": "ns5t8sfvfl3",
                      "properties": {
                        "xvqme75zjjd": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Name"
                          },
                          "x-designable-id": "xvqme75zjjd",
                          "x-index": 0,
                          "properties": {
                            "name": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: Iron(III) nitrate / Mn / Hf(OTf)4"
                              },
                              "x-decorator-props": {},
                              "name": "name",
                              "x-designable-id": "bip4s13gftj",
                              "x-index": 0
                            }
                          }
                        },
                        "jmikm9fhmek": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Role"
                          },
                          "x-designable-id": "jmikm9fhmek",
                          "x-index": 1,
                          "properties": {
                            "role": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: cocatalyst / promoter / modifier"
                              },
                              "x-decorator-props": {},
                              "name": "role",
                              "x-designable-id": "dq3yi7ovahd",
                              "x-index": 0
                            }
                          }
                        },
                        "jqlc5j51qgx": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Operations"
                          },
                          "x-designable-id": "jqlc5j51qgx",
                          "x-index": 2,
                          "properties": {
                            "98i4a3nmpir": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "98i4a3nmpir",
                              "x-index": 0
                            },
                            "krvai6b92vb": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveDown",
                              "x-designable-id": "krvai6b92vb",
                              "x-index": 1
                            },
                            "mgquohagoid": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveUp",
                              "x-designable-id": "mgquohagoid",
                              "x-index": 2
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "fkcyjx1y6ft": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "fkcyjx1y6ft",
                        "x-index": 0
                      }
                    }
                  },
                  "betSurfaceArea": {
                    "type": "string",
                    "title": "Bet Surface Area",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 1200 m²/g / 300 m2·g-1"
                    },
                    "x-decorator-props": {},
                    "name": "betSurfaceArea",
                    "x-designable-id": "1wx0imp3j4e",
                    "x-index": 3
                  },
                  "turnoverFrequency": {
                    "type": "string",
                    "title": "Turnover Frequency",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 0.14 s-1 / 1500 h⁻¹"
                    },
                    "x-decorator-props": {},
                    "name": "turnoverFrequency",
                    "x-designable-id": "uatjp2mld9p",
                    "x-index": 4
                  },
                  "loading": {
                    "type": "string",
                    "title": "Loading",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 10 g/L / 2 mol%"
                    },
                    "x-decorator-props": {},
                    "name": "loading",
                    "x-designable-id": "3no7x16fm4q",
                    "x-index": 5
                  },
                  "support": {
                    "type": "string",
                    "title": "Support",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: carbon black / SiO2"
                    },
                    "x-decorator-props": {},
                    "name": "support",
                    "x-designable-id": "g9zylfwtbjz",
                    "x-index": 6
                  },
                  "shape": {
                    "type": "string",
                    "title": "Shape",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: spherical / nanosheets / core-shell"
                    },
                    "x-decorator-props": {},
                    "name": "shape",
                    "x-designable-id": "mhgrd5km1op",
                    "x-index": 7
                  },
                  "poreSize": {
                    "type": "string",
                    "title": "Pore Size",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 10 nm / mesoporous / 150 Å"
                    },
                    "x-decorator-props": {},
                    "name": "poreSize",
                    "x-designable-id": "zcdpx7u3fx5",
                    "x-index": 8
                  },
                  "poreVolume": {
                    "type": "string",
                    "title": "Pore Volume",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 0.5 cm³/g / 1.6 mL/g"
                    },
                    "x-decorator-props": {},
                    "name": "poreVolume",
                    "x-designable-id": "6yeg1p8v2y6",
                    "x-index": 9
                  },
                  "preparationMethod": {
                    "type": "string",
                    "title": "Preparation Method",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: incipient wetness impregnation /  electrochemical deposition / sol–gel method"
                    },
                    "x-decorator-props": {},
                    "name": "preparationMethod",
                    "x-designable-id": "ipq88ak8uhv",
                    "x-index": 10
                  },
                  "udal3vfymn5": {
                    "type": "void",
                    "x-component": "FormLayout",
                    "x-component-props": {
                      "style": {
                        "borderTopStyle": "solid",
                        "borderTopWidth": "1px",
                        "borderTopColor": "rgba(224,224,224,1)",
                        "padding": "20px 0px 0px 0px"
                      }
                    },
                    "x-reactions": {
                      "dependencies": [
                        {
                          "property": "value",
                          "type": "string | number",
                          "source": "....[].type",
                          "name": "type"
                        }
                      ],
                      "fulfill": {
                        "state": {
                          "visible": "{{$deps.type === \"thermal catalysis\"}}"
                        }
                      }
                    },
                    "x-designable-id": "udal3vfymn5",
                    "x-index": 11,
                    "properties": {
                      "acidityAndBasicity": {
                        "type": "string",
                        "title": "Acidity And Basicity",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: ZnGaOx_NP exhibits Lewis acidity due to coordinatively unsaturated Ga3+ sites"
                        },
                        "x-decorator-props": {},
                        "name": "acidityAndBasicity",
                        "x-reactions": {
                          "dependencies": [
                            {
                              "property": "value",
                              "type": "string | number",
                              "source": "....[].type",
                              "name": "type"
                            }
                          ],
                          "fulfill": {
                            "state": {
                              "visible": "{{$deps.type === \"thermal catalysis\"}}"
                            }
                          }
                        },
                        "x-designable-id": "0nstqvfx0ii",
                        "x-index": 0
                      },
                      "metalOxidationStates": {
                        "type": "array",
                        "x-decorator": "FormItem",
                        "x-component": "ArrayTable",
                        "x-validator": [],
                        "x-component-props": {},
                        "x-decorator-props": {
                          "labelWrap": false,
                          "inset": false,
                          "wrapperWrap": false,
                          "fullness": false,
                          "wrapperAlign": "left",
                          "labelAlign": "left",
                          "layout": "vertical",
                          "size": "large"
                        },
                        "x-designable-id": "d2kr81zjyr2",
                        "x-index": 1,
                        "title": "Metal Oxidation States",
                        "name": "metalOxidationStates",
                        "x-reactions": {
                          "dependencies": [
                            {
                              "property": "value",
                              "type": "string | number",
                              "source": "....[].type",
                              "name": "type"
                            }
                          ],
                          "fulfill": {
                            "state": {
                              "visible": "{{$deps.type === \"thermal catalysis\"}}"
                            }
                          }
                        },
                        "items": {
                          "type": "object",
                          "x-designable-id": "nhmqq8ffmu0",
                          "properties": {
                            "ktfjn01w66l": {
                              "type": "void",
                              "x-component": "ArrayTable.Column",
                              "x-component-props": {
                                "title": "Metal"
                              },
                              "x-designable-id": "ktfjn01w66l",
                              "x-index": 0,
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "x-decorator": "FormItem",
                                  "x-component": "Input",
                                  "x-validator": [],
                                  "x-component-props": {
                                    "placeholder": "eg: Platinum"
                                  },
                                  "x-decorator-props": {},
                                  "name": "name",
                                  "x-designable-id": "m90q7c3j2uc",
                                  "x-index": 0
                                }
                              }
                            },
                            "6u48hgrjzga": {
                              "type": "void",
                              "x-component": "ArrayTable.Column",
                              "x-component-props": {
                                "title": "OxidationState"
                              },
                              "x-designable-id": "6u48hgrjzga",
                              "x-index": 1,
                              "properties": {
                                "role": {
                                  "type": "string",
                                  "x-decorator": "FormItem",
                                  "x-component": "Input",
                                  "x-validator": [],
                                  "x-component-props": {
                                    "placeholder": "eg: 0"
                                  },
                                  "x-decorator-props": {},
                                  "name": "role",
                                  "x-designable-id": "jet5s6ok9nh",
                                  "x-index": 0
                                }
                              }
                            },
                            "chmjb0mfdaq": {
                              "type": "void",
                              "x-component": "ArrayTable.Column",
                              "x-component-props": {
                                "title": "Proportion"
                              },
                              "x-designable-id": "chmjb0mfdaq",
                              "x-index": 2,
                              "properties": {
                                "proportion": {
                                  "type": "string",
                                  "x-decorator": "FormItem",
                                  "x-component": "Input",
                                  "x-validator": [],
                                  "x-component-props": {
                                    "placeholder": "eg: 95%"
                                  },
                                  "x-decorator-props": {},
                                  "name": "proportion",
                                  "x-designable-id": "7h3zf5825oj",
                                  "x-index": 0
                                }
                              }
                            },
                            "rh6sh72nhid": {
                              "type": "void",
                              "x-component": "ArrayTable.Column",
                              "x-component-props": {
                                "title": "Operations"
                              },
                              "x-designable-id": "rh6sh72nhid",
                              "x-index": 3,
                              "properties": {
                                "epko536a2no": {
                                  "type": "void",
                                  "x-component": "ArrayTable.Remove",
                                  "x-designable-id": "epko536a2no",
                                  "x-index": 0
                                },
                                "ekvymbxv1qa": {
                                  "type": "void",
                                  "x-component": "ArrayTable.MoveDown",
                                  "x-designable-id": "ekvymbxv1qa",
                                  "x-index": 1
                                },
                                "7tbouyf9r5c": {
                                  "type": "void",
                                  "x-component": "ArrayTable.MoveUp",
                                  "x-designable-id": "7tbouyf9r5c",
                                  "x-index": 2
                                }
                              }
                            }
                          }
                        },
                        "properties": {
                          "zcg4h3qyoom": {
                            "type": "void",
                            "title": "Addition",
                            "x-component": "ArrayTable.Addition",
                            "x-designable-id": "zcg4h3qyoom",
                            "x-index": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i1fcrxdqoab": {
            "type": "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              "tab": "Conditions",
              "style": {
                "padding": "0% 5% 0% 5%"
              }
            },
            "x-designable-id": "i1fcrxdqoab",
            "x-index": 2,
            "properties": {
              "conditions": {
                "type": "object",
                "x-validator": [],
                "x-designable-id": "n2ztju8b10d",
                "x-index": 0,
                "name": "conditions",
                "properties": {
                  "isHeterogeneous": {
                    "type": "boolean",
                    "title": "Heterogeneous",
                    "x-decorator": "FormItem",
                    "x-component": "Switch",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "name": "isHeterogeneous",
                    "x-designable-id": "5dk8b3aryt0",
                    "x-index": 0
                  },
                  "gases": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {
                      "layout": "vertical",
                      "labelAlign": "left",
                      "size": "default",
                      "labelWrap": false
                    },
                    "x-designable-id": "xdb77pq5h5o",
                    "x-index": 1,
                    "title": "Gases",
                    "name": "gases",
                    "items": {
                      "type": "object",
                      "x-designable-id": "3qipci9fyxz",
                      "properties": {
                        "ng8x8if164f": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Name"
                          },
                          "x-designable-id": "ng8x8if164f",
                          "x-index": 0,
                          "properties": {
                            "name": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: N2"
                              },
                              "x-decorator-props": {},
                              "name": "name",
                              "x-designable-id": "f9bg08lator",
                              "x-index": 0
                            }
                          }
                        },
                        "boxk1gu9pck": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Pressure"
                          },
                          "x-designable-id": "boxk1gu9pck",
                          "x-index": 1,
                          "properties": {
                            "pressure": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 2 atm / 5.2 bar / 0.05 mpa"
                              },
                              "x-decorator-props": {},
                              "name": "pressure",
                              "x-designable-id": "tev4h68m0or",
                              "x-index": 0
                            }
                          }
                        },
                        "qast7dhgzhy": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Operations"
                          },
                          "x-designable-id": "qast7dhgzhy",
                          "x-index": 2,
                          "properties": {
                            "47891unqm57": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "47891unqm57",
                              "x-index": 0
                            },
                            "1goahcgzr63": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveDown",
                              "x-designable-id": "1goahcgzr63",
                              "x-index": 1
                            },
                            "ks3f6f3v81h": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveUp",
                              "x-designable-id": "ks3f6f3v81h",
                              "x-index": 2
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "h1nlne63dr0": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "h1nlne63dr0",
                        "x-index": 0
                      }
                    }
                  },
                  "temperature": {
                    "type": "string",
                    "title": "Temperature",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 300°C   /   323.0 K"
                    },
                    "x-decorator-props": {},
                    "name": "temperature",
                    "x-designable-id": "7mzd7xr4sab",
                    "x-index": 2
                  },
                  "reactionTime": {
                    "type": "string",
                    "title": "Reaction Time",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 2 hours   /  10.0 s"
                    },
                    "x-decorator-props": {},
                    "name": "reactionTime",
                    "x-designable-id": "k0wan7319hf",
                    "x-index": 3
                  },
                  "1td82j11hqo": {
                    "type": "void",
                    "x-component": "FormLayout",
                    "x-component-props": {
                      "style": {
                        "borderStyle": "solid",
                        "borderWidth": "0px",
                        "padding": "20px 0px 0px 0px",
                        "borderRadius": "8px 8px 8px 8px",
                        "borderTopStyle": "solid",
                        "borderTopWidth": "1px",
                        "borderTopColor": "rgba(224,224,224,1)"
                      }
                    },
                    "x-reactions": {
                      "dependencies": [
                        {
                          "property": "value",
                          "type": "string | number",
                          "source": "type",
                          "name": "type"
                        }
                      ],
                      "fulfill": {
                        "state": {
                          "visible": "{{$deps.type === 'photocatalysis'}}"
                        }
                      }
                    },
                    "x-designable-id": "1td82j11hqo",
                    "x-index": 4,
                    "properties": {
                      "lightSource": {
                        "type": "string",
                        "title": "Light Source",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: UV light, 100 mW/cm² / blue LEDs / visible light"
                        },
                        "x-decorator-props": {},
                        "name": "lightSource",
                        "x-designable-id": "9xrsdj8i4ch",
                        "x-index": 0
                      },
                      "lightWavelength": {
                        "type": "string",
                        "title": "Light Wavelength",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: >450 nm / visible light / 440–460 nm"
                        },
                        "x-decorator-props": {},
                        "name": "lightWavelength",
                        "x-designable-id": "q6tjb47fx78",
                        "x-index": 1
                      },
                      "quantumEfficiency": {
                        "type": "string",
                        "title": "Quantum Efficiency",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: 23.2 % / 0.232"
                        },
                        "x-decorator-props": {},
                        "name": "quantumEfficiency",
                        "x-designable-id": "e3d1kmf67sx",
                        "x-index": 2
                      }
                    }
                  },
                  "n7wp5s6264u": {
                    "type": "void",
                    "x-component": "FormLayout",
                    "x-component-props": {
                      "style": {
                        "borderStyle": "solid",
                        "borderWidth": "0px",
                        "padding": "20px 0px 0px 0px",
                        "borderRadius": "8px 8px 8px 8px",
                        "borderTopColor": "rgba(224,224,224,1)",
                        "borderTopStyle": "solid",
                        "borderTopWidth": "1px"
                      }
                    },
                    "x-reactions": {
                      "dependencies": [
                        {
                          "property": "value",
                          "type": "string | number",
                          "source": "type",
                          "name": "type"
                        }
                      ],
                      "fulfill": {
                        "state": {
                          "visible": "{{$deps.type === 'electorcatalysis'}}"
                        }
                      }
                    },
                    "x-designable-id": "n7wp5s6264u",
                    "x-index": 5,
                    "properties": {
                      "electrodeMaterial": {
                        "type": "string",
                        "title": "Electrode Material",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: Bi2S3-derived nanocomposite / glassy carbon"
                        },
                        "x-decorator-props": {},
                        "name": "electrodeMaterial",
                        "x-designable-id": "zckcxm2l13e",
                        "x-index": 0
                      },
                      "appliedPotential": {
                        "type": "string",
                        "title": "Applied Potential",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: 1.6 V / -1.2 V vs. NHE / 2.1 V vs SHE"
                        },
                        "x-decorator-props": {},
                        "name": "appliedPotential",
                        "x-designable-id": "kj3n3iug66q",
                        "x-index": 1
                      },
                      "currentDensity": {
                        "type": "string",
                        "title": "Current Density",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: 10 mA/cm² / -5 mA cm-2"
                        },
                        "x-decorator-props": {},
                        "name": "currentDensity",
                        "x-designable-id": "8y9axj0ttnt",
                        "x-index": 2
                      },
                      "referenceElectrode": {
                        "type": "string",
                        "title": "Reference Electrode",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: Reversible Hydrogen Electrode (RHE) / Ag/AgCl (3 M KCl)"
                        },
                        "x-decorator-props": {},
                        "name": "referenceElectrode",
                        "x-designable-id": "98o1pibzups",
                        "x-index": 3
                      },
                      "counterElectrode": {
                        "type": "string",
                        "title": "Counter Electrode",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: Pt wire / graphite rod / Pt / Pt mesh / graphite electrode"
                        },
                        "x-decorator-props": {},
                        "name": "counterElectrode",
                        "x-designable-id": "urc722wumt9",
                        "x-index": 4
                      },
                      "energyConversionEfficiency": {
                        "type": "string",
                        "title": "Energy Conversion Efficiency",
                        "x-decorator": "FormItem",
                        "x-component": "Input",
                        "x-validator": [],
                        "x-component-props": {
                          "placeholder": "eg: 84.5% / 0.8 / >99%"
                        },
                        "x-decorator-props": {},
                        "name": "energyConversionEfficiency",
                        "x-designable-id": "1v3qyq1yl2l",
                        "x-index": 5
                      }
                    }
                  }
                }
              }
            }
          },
          "1s1w1xdrhj3": {
            "type": "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              "tab": "Solvents",
              "style": {
                "padding": "0% 5% 0% 5%"
              }
            },
            "x-designable-id": "1s1w1xdrhj3",
            "x-index": 3,
            "properties": {
              "solvents": {
                "type": "object",
                "x-validator": [],
                "x-designable-id": "fh8lcgfdr8z",
                "x-index": 0,
                "name": "solvents",
                "properties": {
                  "solvent": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "ucgi67fwv20",
                    "x-index": 0,
                    "name": "solvent",
                    "items": {
                      "type": "object",
                      "x-designable-id": "6f2habdqh5h",
                      "properties": {
                        "og50z6kefqz": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Name"
                          },
                          "x-designable-id": "og50z6kefqz",
                          "x-index": 0,
                          "properties": {
                            "name": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: H2O / toluene / CH3CN / MeCN / DMF / THF"
                              },
                              "x-decorator-props": {},
                              "name": "name",
                              "x-designable-id": "hncjlbpjsdw",
                              "x-index": 0
                            }
                          }
                        },
                        "7gbqy0q6dap": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Amount"
                          },
                          "x-designable-id": "7gbqy0q6dap",
                          "x-index": 1,
                          "properties": {
                            "amount": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 100 mL / 0.05M,  0.2g /  5%,  20 mmol  /  2.5%"
                              },
                              "x-decorator-props": {},
                              "name": "amount",
                              "x-designable-id": "yxtyftmdo7d",
                              "x-index": 0
                            }
                          }
                        },
                        "bybtqbiyk44": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Title"
                          },
                          "x-designable-id": "bybtqbiyk44",
                          "x-index": 2,
                          "properties": {
                            "n6wroq89iii": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "n6wroq89iii",
                              "x-index": 0
                            },
                            "4l8fjqpug0e": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveDown",
                              "x-designable-id": "4l8fjqpug0e",
                              "x-index": 1
                            },
                            "zrw1jx8iipo": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveUp",
                              "x-designable-id": "zrw1jx8iipo",
                              "x-index": 2
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "vp7dqa5cniy": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "vp7dqa5cniy",
                        "x-index": 0,
                        "x-component-props": {}
                      }
                    }
                  },
                  "pH": {
                    "type": "string",
                    "title": "pH",
                    "x-decorator": "FormItem",
                    "x-component": "Input",
                    "x-validator": [],
                    "x-component-props": {
                      "placeholder": "eg: 1.3  / neutral / 7.2–7.4 / 13.00 ± 0.01 / <1"
                    },
                    "x-decorator-props": {},
                    "name": "pH",
                    "x-designable-id": "k8o3sex85mc",
                    "x-index": 1
                  }
                }
              }
            }
          },
          "pj2w6d61zsv": {
            "type": "void",
            "x-component": "FormTab.TabPane",
            "x-component-props": {
              "tab": "Products",
              "style": {
                "padding": "0% 5% 0% 5%"
              }
            },
            "x-designable-id": "pj2w6d61zsv",
            "x-index": 4,
            "properties": {
              "productions": {
                "type": "object",
                "x-validator": [],
                "name": "productions",
                "x-designable-id": "0qr8rcafne2",
                "x-index": 0,
                "properties": {
                  "productions": {
                    "type": "array",
                    "x-decorator": "FormItem",
                    "x-component": "ArrayTable",
                    "x-validator": [],
                    "x-component-props": {},
                    "x-decorator-props": {},
                    "x-designable-id": "9ypa2x4cnfg",
                    "x-index": 0,
                    "name": "productions",
                    "items": {
                      "type": "object",
                      "x-designable-id": "0kg7to8vg4t",
                      "properties": {
                        "x7eerswhi3r": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Name"
                          },
                          "x-designable-id": "x7eerswhi3r",
                          "x-index": 0,
                          "properties": {
                            "name": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: methanol"
                              },
                              "x-decorator-props": {},
                              "name": "name",
                              "x-designable-id": "1law2eb87jl",
                              "x-index": 0
                            }
                          }
                        },
                        "wsmrtk9iuig": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Yield"
                          },
                          "x-designable-id": "wsmrtk9iuig",
                          "x-index": 1,
                          "properties": {
                            "yield": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 91.5 % / >99% / above 99% / near-quantitativ"
                              },
                              "x-decorator-props": {},
                              "name": "yield",
                              "x-designable-id": "yvukav6haa8",
                              "x-index": 0
                            }
                          }
                        },
                        "mm4npc74xrw": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Selectivity"
                          },
                          "x-designable-id": "mm4npc74xrw",
                          "x-index": 2,
                          "properties": {
                            "selectivity": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 98 % / >99% / near 100% / negligible / trace amounts"
                              },
                              "x-decorator-props": {},
                              "name": "selectivity",
                              "x-designable-id": "ga18wi4pa54",
                              "x-index": 0
                            }
                          }
                        },
                        "v8wyf099iso": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Faradaic Efficiency"
                          },
                          "x-reactions": {
                            "dependencies": [
                              {
                                "property": "value",
                                "type": "string | number",
                                "source": "type",
                                "name": "type"
                              }
                            ],
                            "fulfill": {
                              "state": {
                                "visible": "{{$deps.type === 'electorcatalysis'}}"
                              }
                            }
                          },
                          "x-designable-id": "v8wyf099iso",
                          "x-index": 3,
                          "properties": {
                            "faradaicEfficiency": {
                              "type": "string",
                              "x-decorator": "FormItem",
                              "x-component": "Input",
                              "x-validator": [],
                              "x-component-props": {
                                "placeholder": "eg: 92.2 %"
                              },
                              "x-decorator-props": {},
                              "name": "faradaicEfficiency",
                              "x-designable-id": "x7uj8yujopk",
                              "x-index": 0,
                              "x-reactions": {
                                "dependencies": [
                                  {
                                    "property": "value",
                                    "type": "string | number",
                                    "source": "type",
                                    "name": "type"
                                  }
                                ],
                                "fulfill": {
                                  "state": {
                                    "pattern": "{{$deps.type === 'electorcatalysis' ? 'editable' : 'disabled'}}"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "6vx8exbgo81": {
                          "type": "void",
                          "x-component": "ArrayTable.Column",
                          "x-component-props": {
                            "title": "Operations"
                          },
                          "x-designable-id": "6vx8exbgo81",
                          "x-index": 4,
                          "properties": {
                            "t22hmice0xn": {
                              "type": "void",
                              "x-component": "ArrayTable.Remove",
                              "x-designable-id": "t22hmice0xn",
                              "x-index": 0
                            },
                            "ojiwmsvwdr8": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveDown",
                              "x-designable-id": "ojiwmsvwdr8",
                              "x-index": 1
                            },
                            "bp2bxc1o1ng": {
                              "type": "void",
                              "x-component": "ArrayTable.MoveUp",
                              "x-designable-id": "bp2bxc1o1ng",
                              "x-index": 2
                            }
                          }
                        }
                      }
                    },
                    "properties": {
                      "89wlgl67zba": {
                        "type": "void",
                        "title": "Addition",
                        "x-component": "ArrayTable.Addition",
                        "x-designable-id": "89wlgl67zba",
                        "x-index": 0,
                        "x-component-props": {
                          "method": "push"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "x-designable-id": "zjblzria0di"
  }
};
