{
    "bpmn2:definitions": {
        "$": {
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xmlns:bpmn2": "http://www.omg.org/spec/BPMN/20100524/MODEL",
            "xmlns:bpmndi": "http://www.omg.org/spec/BPMN/20100524/DI",
            "xmlns:dc": "http://www.omg.org/spec/DD/20100524/DC",
            "xmlns:di": "http://www.omg.org/spec/DD/20100524/DI",
            "id": "Definitions_1",
            "targetNamespace": "http://sample.bpmn2.org/bpmn2/sample/process"
        },
        "bpmn2:process": [
            {
                "$": {
                    "id": "process",
                    "name": "Default Process",
                    "processType": "Public"
                },
                "bpmn2:startEvent": [
                    {
                        "$": {
                            "id": "StartEvent_1"
                        },
                        "bpmn2:outgoing": [
                            "SequenceFlow_9"
                        ],
                        "bpmn2:messageEventDefinition": [
                            {
                                "$": {
                                    "id": "MessageEventDefinition_4"
                                }
                            }
                        ]
                    }
                ],
                "bpmn2:sequenceFlow": [
                    {
                        "$": {
                            "id": "SequenceFlow_9",
                            "sourceRef": "StartEvent_1",
                            "targetRef": "Task_2"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_10",
                            "sourceRef": "Task_2",
                            "targetRef": "ExclusiveGateway_2"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_11",
                            "name": "no",
                            "sourceRef": "ExclusiveGateway_2",
                            "targetRef": "CallActivity_1"
                        },
                        "bpmn2:conditionExpression": [
                            {
                                "_": "false",
                                "$": {
                                    "xsi:type": "bpmn2:tFormalExpression",
                                    "id": "FormalExpression_4",
                                    "language": "http://www.w3.org/1999/XPath"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_12",
                            "name": "yes",
                            "sourceRef": "ExclusiveGateway_2",
                            "targetRef": "Task_3"
                        },
                        "bpmn2:conditionExpression": [
                            {
                                "_": "true",
                                "$": {
                                    "xsi:type": "bpmn2:tFormalExpression",
                                    "id": "FormalExpression_5",
                                    "language": "http://www.w3.org/1999/XPath"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_13",
                            "sourceRef": "CallActivity_1",
                            "targetRef": "Task_3"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_14",
                            "sourceRef": "Task_3",
                            "targetRef": "Task_4"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_16",
                            "name": "undeliverable",
                            "sourceRef": "CallActivity_1",
                            "targetRef": "Task_5"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_18",
                            "name": "Late delivery",
                            "sourceRef": "CallActivity_1",
                            "targetRef": "Task_6"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_19",
                            "sourceRef": "Task_6",
                            "targetRef": "Task_7"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_20",
                            "sourceRef": "Task_5",
                            "targetRef": "EndEvent_4"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_21",
                            "sourceRef": "Task_7",
                            "targetRef": "EndEvent_5"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_22",
                            "sourceRef": "Task_4",
                            "targetRef": "EndEvent_6"
                        }
                    }
                ],
                "bpmn2:task": [
                    {
                        "$": {
                            "id": "Task_2",
                            "name": "Check availability"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_9"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_10"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_3",
                            "name": "Ship article"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_12",
                            "SequenceFlow_13"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_14"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_4",
                            "name": "Financial settlement"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_14"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_22"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_5",
                            "name": "Inform customer"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_16"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_20"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_6",
                            "name": "Inform customer"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_18"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_19"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_7",
                            "name": "Remove article from calatogue"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_19"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_21"
                        ]
                    }
                ],
                "bpmn2:exclusiveGateway": [
                    {
                        "$": {
                            "id": "ExclusiveGateway_2",
                            "name": "Article available",
                            "gatewayDirection": "Diverging"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_10"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_11",
                            "SequenceFlow_12"
                        ]
                    }
                ],
                "bpmn2:callActivity": [
                    {
                        "$": {
                            "id": "CallActivity_1",
                            "name": "Procurement",
                            "calledElement": "Process_1"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_11"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_13",
                            "SequenceFlow_16",
                            "SequenceFlow_18"
                        ],
                        "bpmn2:ioSpecification": [
                            {
                                "$": {
                                    "id": "InputOutputSpecification_4"
                                },
                                "bpmn2:inputSet": [
                                    {
                                        "$": {
                                            "id": "InputSet_2",
                                            "name": "Input Set 2"
                                        }
                                    }
                                ],
                                "bpmn2:outputSet": [
                                    {
                                        "$": {
                                            "id": "_OutputSet_3",
                                            "name": "Output Set 3"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "bpmn2:endEvent": [
                    {
                        "$": {
                            "id": "EndEvent_4",
                            "name": "Customer inform"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_20"
                        ]
                    },
                    {
                        "$": {
                            "id": "EndEvent_5",
                            "name": "ARticle removed"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_21"
                        ]
                    },
                    {
                        "$": {
                            "id": "EndEvent_6",
                            "name": "Payment received"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_22"
                        ]
                    }
                ]
            },
            {
                "$": {
                    "id": "Process_1",
                    "name": "subprocess",
                    "processType": "Public"
                },
                "bpmn2:endEvent": [
                    {
                        "$": {
                            "id": "EndEvent_2",
                            "name": "End Event 2"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_2"
                        ],
                        "bpmn2:inputSet": [
                            {
                                "$": {
                                    "id": "InputSet_1",
                                    "name": "Input Set 2"
                                }
                            }
                        ],
                        "bpmn2:errorEventDefinition": [
                            {
                                "$": {
                                    "id": "ErrorEventDefinition_1"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "EndEvent_3",
                            "name": "End Event 5"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_8"
                        ]
                    }
                ],
                "bpmn2:task": [
                    {
                        "$": {
                            "id": "Task_1",
                            "name": "Order from supplier"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_4",
                            "SequenceFlow_5"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_3"
                        ]
                    },
                    {
                        "$": {
                            "id": "Task_8",
                            "name": "Check availability with supplier"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_6"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_7"
                        ]
                    }
                ],
                "bpmn2:startEvent": [
                    {
                        "$": {
                            "id": "StartEvent_2",
                            "name": "Start Event 1"
                        },
                        "bpmn2:outgoing": [
                            "SequenceFlow_6"
                        ]
                    }
                ],
                "bpmn2:exclusiveGateway": [
                    {
                        "$": {
                            "id": "ExclusiveGateway_1",
                            "name": "Exclusive Gateway 1",
                            "gatewayDirection": "Diverging"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_7"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_2",
                            "SequenceFlow_5",
                            "SequenceFlow_23"
                        ]
                    }
                ],
                "bpmn2:intermediateThrowEvent": [
                    {
                        "$": {
                            "id": "IntermediateThrowEvent_1",
                            "name": "Intermediate Throw Event 2"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_23"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_4"
                        ],
                        "bpmn2:escalationEventDefinition": [
                            {
                                "$": {
                                    "id": "EscalationEventDefinition_1"
                                }
                            },
                            {
                                "$": {
                                    "id": "EscalationEventDefinition_2"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "IntermediateThrowEvent_2",
                            "name": "Intermediate Throw Event 3"
                        },
                        "bpmn2:incoming": [
                            "SequenceFlow_3"
                        ],
                        "bpmn2:outgoing": [
                            "SequenceFlow_8"
                        ],
                        "bpmn2:messageEventDefinition": [
                            {
                                "$": {
                                    "id": "MessageEventDefinition_1"
                                }
                            },
                            {
                                "$": {
                                    "id": "MessageEventDefinition_2"
                                }
                            },
                            {
                                "$": {
                                    "id": "MessageEventDefinition_3"
                                }
                            }
                        ]
                    }
                ],
                "bpmn2:sequenceFlow": [
                    {
                        "$": {
                            "id": "SequenceFlow_2",
                            "name": "no",
                            "sourceRef": "ExclusiveGateway_1",
                            "targetRef": "EndEvent_2"
                        },
                        "bpmn2:conditionExpression": [
                            {
                                "_": "no",
                                "$": {
                                    "xsi:type": "bpmn2:tFormalExpression",
                                    "id": "FormalExpression_1",
                                    "language": "http://www.w3.org/1999/XPath"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_3",
                            "sourceRef": "Task_1",
                            "targetRef": "IntermediateThrowEvent_2"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_4",
                            "sourceRef": "IntermediateThrowEvent_1",
                            "targetRef": "Task_1"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_5",
                            "name": "< = 2 days",
                            "sourceRef": "ExclusiveGateway_1",
                            "targetRef": "Task_1"
                        },
                        "bpmn2:conditionExpression": [
                            {
                                "_": "value<=2",
                                "$": {
                                    "xsi:type": "bpmn2:tFormalExpression",
                                    "id": "FormalExpression_2",
                                    "language": "http://www.w3.org/1999/XPath"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_6",
                            "sourceRef": "StartEvent_2",
                            "targetRef": "Task_8"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_7",
                            "sourceRef": "Task_8",
                            "targetRef": "ExclusiveGateway_1"
                        }
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_23",
                            "name": "> 2 days",
                            "sourceRef": "ExclusiveGateway_1",
                            "targetRef": "IntermediateThrowEvent_1"
                        },
                        "bpmn2:conditionExpression": [
                            {
                                "_": "value >2",
                                "$": {
                                    "xsi:type": "bpmn2:tFormalExpression",
                                    "id": "FormalExpression_3",
                                    "language": "http://www.w3.org/1999/XPath"
                                }
                            }
                        ]
                    },
                    {
                        "$": {
                            "id": "SequenceFlow_8",
                            "sourceRef": "IntermediateThrowEvent_2",
                            "targetRef": "EndEvent_3"
                        }
                    }
                ]
            }
        ],
        "bpmndi:BPMNDiagram": [
            {
                "$": {
                    "id": "BPMNDiagram_1",
                    "name": "procurement subprocess"
                },
                "bpmndi:BPMNPlane": [
                    {
                        "$": {
                            "id": "BPMNPlane_1",
                            "bpmnElement": "process"
                        },
                        "bpmndi:BPMNShape": [
                            {
                                "$": {
                                    "id": "BPMNShape_1",
                                    "bpmnElement": "StartEvent_1"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "20.0",
                                            "y": "182.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_3",
                                    "bpmnElement": "Task_2"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "100.0",
                                            "y": "175.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_ExclusiveGateway_2",
                                    "bpmnElement": "ExclusiveGateway_2",
                                    "isMarkerVisible": "true"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "50.0",
                                            "x": "250.0",
                                            "y": "175.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_CallActivity_1",
                                    "bpmnElement": "CallActivity_1",
                                    "isExpanded": "true"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "290.0",
                                            "y": "280.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_4",
                                    "bpmnElement": "Task_3"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "391.0",
                                            "y": "175.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_5",
                                    "bpmnElement": "Task_4"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "530.0",
                                            "y": "176.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_6",
                                    "bpmnElement": "Task_5"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "461.0",
                                            "y": "329.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_7",
                                    "bpmnElement": "Task_6"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "419.0",
                                            "y": "458.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_8",
                                    "bpmnElement": "Task_7"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "634.0",
                                            "y": "458.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_EndEvent_3",
                                    "bpmnElement": "EndEvent_4"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "639.0",
                                            "y": "336.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_EndEvent_4",
                                    "bpmnElement": "EndEvent_5"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "812.0",
                                            "y": "465.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_EndEvent_5",
                                    "bpmnElement": "EndEvent_6"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "708.0",
                                            "y": "183.0"
                                        }
                                    }
                                ]
                            }
                        ],
                        "bpmndi:BPMNEdge": [
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_10",
                                    "bpmnElement": "SequenceFlow_9",
                                    "sourceElement": "BPMNShape_1",
                                    "targetElement": "BPMNShape_Task_3"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "56.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "75.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "75.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "100.0",
                                            "y": "200.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_11",
                                    "bpmnElement": "SequenceFlow_10",
                                    "sourceElement": "BPMNShape_Task_3",
                                    "targetElement": "BPMNShape_ExclusiveGateway_2"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "210.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "228.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "228.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "250.0",
                                            "y": "200.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_12",
                                    "bpmnElement": "SequenceFlow_11",
                                    "sourceElement": "BPMNShape_ExclusiveGateway_2",
                                    "targetElement": "BPMNShape_CallActivity_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "275.0",
                                            "y": "226.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "275.0",
                                            "y": "305.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "290.0",
                                            "y": "305.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_13",
                                    "bpmnElement": "SequenceFlow_12",
                                    "sourceElement": "BPMNShape_ExclusiveGateway_2",
                                    "targetElement": "BPMNShape_Task_4"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "301.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "341.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "341.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "391.0",
                                            "y": "200.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_14",
                                    "bpmnElement": "SequenceFlow_13",
                                    "sourceElement": "BPMNShape_CallActivity_1",
                                    "targetElement": "BPMNShape_Task_4"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "400.0",
                                            "y": "305.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "446.0",
                                            "y": "305.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "446.0",
                                            "y": "225.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_15",
                                    "bpmnElement": "SequenceFlow_14",
                                    "sourceElement": "BPMNShape_Task_4",
                                    "targetElement": "BPMNShape_Task_5"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "501.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "514.0",
                                            "y": "200.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "514.0",
                                            "y": "201.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "530.0",
                                            "y": "201.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_17",
                                    "bpmnElement": "SequenceFlow_16",
                                    "sourceElement": "BPMNShape_CallActivity_1",
                                    "targetElement": "BPMNShape_Task_6"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "345.0",
                                            "y": "330.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "345.0",
                                            "y": "354.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "461.0",
                                            "y": "354.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_19",
                                    "bpmnElement": "SequenceFlow_18",
                                    "sourceElement": "BPMNShape_CallActivity_1",
                                    "targetElement": "BPMNShape_Task_7"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "345.0",
                                            "y": "330.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "345.0",
                                            "y": "346.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "334.0",
                                            "y": "346.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "334.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "419.0",
                                            "y": "483.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_20",
                                    "bpmnElement": "SequenceFlow_19",
                                    "sourceElement": "BPMNShape_Task_7",
                                    "targetElement": "BPMNShape_Task_8"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "529.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "576.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "576.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "634.0",
                                            "y": "483.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_21",
                                    "bpmnElement": "SequenceFlow_20",
                                    "sourceElement": "BPMNShape_Task_6",
                                    "targetElement": "BPMNShape_EndEvent_3"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "571.0",
                                            "y": "354.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "601.0",
                                            "y": "354.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "601.0",
                                            "y": "354.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "639.0",
                                            "y": "354.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_22",
                                    "bpmnElement": "SequenceFlow_21",
                                    "sourceElement": "BPMNShape_Task_8",
                                    "targetElement": "BPMNShape_EndEvent_4"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "744.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "774.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "774.0",
                                            "y": "483.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "812.0",
                                            "y": "483.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_23",
                                    "bpmnElement": "SequenceFlow_22",
                                    "sourceElement": "BPMNShape_Task_5",
                                    "targetElement": "BPMNShape_EndEvent_5"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "640.0",
                                            "y": "201.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "670.0",
                                            "y": "201.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "670.0",
                                            "y": "201.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "708.0",
                                            "y": "201.0"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "$": {
                    "id": "BPMNDiagram_2",
                    "name": "subprocess"
                },
                "bpmndi:BPMNPlane": [
                    {
                        "$": {
                            "id": "BPMNPlane_Process_1",
                            "bpmnElement": "Process_1"
                        },
                        "bpmndi:BPMNShape": [
                            {
                                "$": {
                                    "id": "BPMNShape_EndEvent_1",
                                    "bpmnElement": "EndEvent_2"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "728.0",
                                            "y": "400.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_1",
                                    "bpmnElement": "Task_1"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "691.0",
                                            "y": "126.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_StartEvent_1",
                                    "bpmnElement": "StartEvent_2"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "258.0",
                                            "y": "277.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_Task_2",
                                    "bpmnElement": "Task_8"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "110.0",
                                            "x": "358.0",
                                            "y": "270.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_ExclusiveGateway_1",
                                    "bpmnElement": "ExclusiveGateway_1",
                                    "isMarkerVisible": "true"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "50.0",
                                            "width": "50.0",
                                            "x": "499.0",
                                            "y": "270.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_IntermediateThrowEvent_1",
                                    "bpmnElement": "IntermediateThrowEvent_1"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "728.0",
                                            "y": "277.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_IntermediateThrowEvent_2",
                                    "bpmnElement": "IntermediateThrowEvent_2"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "898.0",
                                            "y": "133.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNShape_EndEvent_2",
                                    "bpmnElement": "EndEvent_3"
                                },
                                "dc:Bounds": [
                                    {
                                        "$": {
                                            "height": "36.0",
                                            "width": "36.0",
                                            "x": "1050.0",
                                            "y": "133.0"
                                        }
                                    }
                                ]
                            }
                        ],
                        "bpmndi:BPMNEdge": [
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_2",
                                    "bpmnElement": "SequenceFlow_2",
                                    "sourceElement": "BPMNShape_ExclusiveGateway_1",
                                    "targetElement": "BPMNShape_EndEvent_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "524.0",
                                            "y": "321.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "524.0",
                                            "y": "418.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "728.0",
                                            "y": "418.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_3",
                                    "bpmnElement": "SequenceFlow_3",
                                    "sourceElement": "BPMNShape_Task_1",
                                    "targetElement": "BPMNShape_IntermediateThrowEvent_2"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "801.0",
                                            "y": "151.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "898.0",
                                            "y": "151.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_4",
                                    "bpmnElement": "SequenceFlow_4",
                                    "sourceElement": "BPMNShape_IntermediateThrowEvent_1",
                                    "targetElement": "BPMNShape_Task_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "746.0",
                                            "y": "277.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "746.0",
                                            "y": "176.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_5",
                                    "bpmnElement": "SequenceFlow_5",
                                    "sourceElement": "BPMNShape_ExclusiveGateway_1",
                                    "targetElement": "BPMNShape_Task_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "524.0",
                                            "y": "270.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "524.0",
                                            "y": "151.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "691.0",
                                            "y": "151.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_6",
                                    "bpmnElement": "SequenceFlow_6",
                                    "sourceElement": "BPMNShape_StartEvent_1",
                                    "targetElement": "BPMNShape_Task_2"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "294.0",
                                            "y": "295.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "358.0",
                                            "y": "295.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_7",
                                    "bpmnElement": "SequenceFlow_7",
                                    "sourceElement": "BPMNShape_Task_2",
                                    "targetElement": "BPMNShape_ExclusiveGateway_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "468.0",
                                            "y": "295.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "499.0",
                                            "y": "295.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_8",
                                    "bpmnElement": "SequenceFlow_23",
                                    "sourceElement": "BPMNShape_ExclusiveGateway_1",
                                    "targetElement": "BPMNShape_IntermediateThrowEvent_1"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "550.0",
                                            "y": "295.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "728.0",
                                            "y": "295.0"
                                        }
                                    }
                                ]
                            },
                            {
                                "$": {
                                    "id": "BPMNEdge_SequenceFlow_9",
                                    "bpmnElement": "SequenceFlow_8",
                                    "sourceElement": "BPMNShape_IntermediateThrowEvent_2",
                                    "targetElement": "BPMNShape_EndEvent_2"
                                },
                                "di:waypoint": [
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "934.0",
                                            "y": "151.0"
                                        }
                                    },
                                    {
                                        "$": {
                                            "xsi:type": "dc:Point",
                                            "x": "1050.0",
                                            "y": "151.0"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}