/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Formily from "./Formily";
import {
  Collapse,
  Divider,
  Button as AntButton,
  Flex,
  Tag,
  Tooltip as AntTooltip,
  Popconfirm,
} from "antd";
import { useEffect } from "react";
import { schema } from "./schema";
import {
  AimOutlined,
  BlockOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  // MenuOutlined,
} from "@ant-design/icons";
import { MoveableContainer } from "./MoveableContainer/MoveableContainer";
import {
  PdfViewerComponent,
  Magnification,
  Navigation,
  LinkAnnotation,
  ThumbnailView,
  ContextMenuItem,
  TextSelection,
  Annotation,
  TextSearch,
  Inject,
  AnnotationAddEventArgs,
  PdfViewer,
  Toolbar,
} from "@syncfusion/ej2-react-pdfviewer";

const COLOR_COLLECTION = [
  "#5470c6", // 蓝色
  "#91cc75", // 绿色
  "#fac858", // 黄色
  "#ee6666", // 红色
  "#73c0de", // 浅蓝色
  "#3ba272", // 深绿色
  "#fc8452", // 橙色
  "#9a60b4", // 紫色
  "#ea7ccc", // 粉色
];

const getNewColor = (colors: string[]) => {
  const colorSet = new Set(
    colors.length < 9
      ? colors
      : colors.slice(colors.length - COLOR_COLLECTION.length, colors.length)
  );
  for (const color of COLOR_COLLECTION) {
    if (!colorSet.has(color)) {
      return color;
    }
  }
  return COLOR_COLLECTION[colors.length % COLOR_COLLECTION.length];
};

interface Note {
  annotationId: string;
  // values: any;
  // annotationBound: AnnotationAddEventArgs['annotationBound'];
  // pageIndex: number;
  highlightAreas: any;
  quote: string;
}

interface HighlightExampleProps {
  fileUrl: string;
  initialReactions?: Reaction[];
}

interface Reaction {
  color: string;
  id: string;
  hidden: boolean;
  value: any;
  notes: Note[];
}

const getRandomString = () =>
  `${new Date().valueOf()}-${(Math.random() * 1e16).toString(32).slice(0, 5)}`;

const HighlightExample: React.FC<HighlightExampleProps> = ({
  fileUrl,
  initialReactions,
}) => {
  const [currentSelected, setCurrentSelected] = React.useState<string>();
  // const [selectedNote, setSelectedNote] = React.useState<string>();
  const [reactions, setReactions] = React.useState<Reaction[]>(
    initialReactions || []
  );
  const viewer = React.useRef<PdfViewerComponent>(null);

  useEffect(() => {
    if (!currentSelected && reactions.length > 0) {
      setCurrentSelected(reactions[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reactions", JSON.stringify(reactions));
    if (!viewer.current) {
      return;
    }
    const v = (viewer.current.element as any)["ej2_instances"][0] as PdfViewer;
    // window.v = v;
    const newAnnotationIds = reactions
      .flatMap((reaction) => {
        return reaction.notes.map((note) => {
          return note.highlightAreas;
        });
      })
      .map((annotation) => annotation.name);
    const hiddenAnnotationIds = reactions.flatMap((reaction) => {
      return reaction.hidden ? reaction.notes.map((note) => {
        return note.highlightAreas;
      }) : [];
    }).map((annotation) => annotation.name as string);
    const oldAnnotations = v.annotationCollection || [];
    // console.log({hiddenAnnotationIds});
    for (const oldAnnotation of oldAnnotations) {
      if (newAnnotationIds.includes(oldAnnotation.annotationId)) {
        
        const needToChange = (hiddenAnnotationIds.includes(oldAnnotation.annotationId) && oldAnnotation.opacity !== 0) || (!hiddenAnnotationIds.includes(oldAnnotation.annotationId) && oldAnnotation.opacity !== 1);
        const pageIndex = oldAnnotation.pageIndex;
        
        if (needToChange) {
          (v.annotationModule as any).isAnnotDeletionApiCall = true;
          v.annotationModule.selectAnnotation(oldAnnotation.annotationId);
          
          v.annotation.textMarkupAnnotationModule.modifyOpacityProperty({value: hiddenAnnotationIds.includes(oldAnnotation.annotationId) ? 0 : 100, name: "changed"});
          (v.annotationModule as any).isAnnotDeletionApiCall = false;
          v.clearSelection(pageIndex);
        }
        continue;
      }
      v.annotation.clearSelection();
      v.annotation.deleteAnnotationById(oldAnnotation.annotationId);
    }
  }, [reactions]);

  const currentReactionIndex = reactions.findIndex(
    (r) => r.id === currentSelected
  );
  const currentReactionColor =
    currentReactionIndex !== -1 ? reactions[currentReactionIndex].color : "";

  const _exportAnnotation = async (id: string) => {
    if (!viewer.current) {
      return;
    }
    const v = (viewer.current.element as any)["ej2_instances"][0] as PdfViewer;
    const res = await v.exportAnnotationsAsObject();
    const value = JSON.parse((res as any) || "{}");
    if (!value || !value.pdfAnnotation) {
      return;
    }
    const pages = Object.keys(value.pdfAnnotation);
    let result: any;
    for (const page of pages) {
      const annotations = value.pdfAnnotation[page].shapeAnnotation || [];
      const temp = annotations.find((ann: any) => ann.name === id);
      if (temp) {
        delete temp.appearance;
        result = temp;
        break;
      }
    }
    return result;
  };

  const _deleteAnnotation = async (id: string) => {
    if (!viewer.current) {
      return;
    }
    const v = (viewer.current.element as any)["ej2_instances"][0] as PdfViewer;
    v.annotation.deleteAnnotationById(id);
  };

  const _selectAnnotation = async (id: string) => {
    if (!viewer.current) {
      return;
    }
    const v = (viewer.current.element as any)["ej2_instances"][0] as PdfViewer;
    v.annotation.selectAnnotation(id);
    v.annotation.clearSelection();
  };

  const handleCreateNewReaction = (value?: any) => {
    const fileName = fileUrl.split("/").pop();
    const newReactions = reactions.concat([
      {
        color: getNewColor(reactions.map((r) => r.color)),
        id: `${fileName}-reaction-${getRandomString()}`,
        hidden: false,
        notes: [],
        value: value || {},
      },
    ]);
    setReactions(newReactions);
    setCurrentSelected(newReactions[newReactions.length - 1].id);
  };

  const handleChange = (value: Record<string, any>, r_id: string) => {
    // the reactions is the old state
    // so get latest state from local storage
    // TODO: find the reason and avoid using local storage
    const storeReactions: any[] = JSON.parse(
      localStorage.getItem("reactions") || "[]"
    );
    const newReactions = storeReactions.map((reaction) => {
      if (r_id === reaction.id) {
        return {
          ...reaction,
          value,
        };
      }
      return reaction;
    });
    setReactions(newReactions);
  };

  return (
    <div
      style={{
        // overflow: "hidden",
        maxWidth: "100%",
        height: "75vh",
      }}
    >
      <MoveableContainer direction="row" movingWrapper={true}>
        <div style={{ height: "75vh" }}>
          <PdfViewerComponent
            id="container"
            ref={viewer}
            documentPath={`https://cdn.hzc.pub/${fileUrl}`}
            resourceUrl="https://cdn.syncfusion.com/ej2/26.2.11/dist/ej2-pdfviewer-lib"
            style={{ height: "100%", width: "100%" }}
            width={"100%"}
            enablePrint={false}
            enableInkAnnotation={false}
            pageRenderComplete={() => {
              if (!viewer.current) {
                return;
              }
              const v = (viewer.current.element as any)[
                "ej2_instances"
              ][0] as PdfViewer;
              const annotations = reactions.flatMap((reaction) => {
                return reaction.notes.map((note) => {
                  return note.highlightAreas;
                });
              });
              // console.log(annotations);
              const pages = new Array(v.pageCount).fill(0).map((_, i) => i);
              const value = { pdfAnnotation: {} };
              for (const page of pages) {
                (value.pdfAnnotation as any)[page] = { shapeAnnotation: [] };
              }
              for (const result of annotations) {
                if (!result || !result.page) {
                  continue;
                }
                (value.pdfAnnotation as any)[result.page].shapeAnnotation.push(
                  result
                );
              }
              v.importAnnotation(value);
            }}
            highlightSettings={{ color: currentReactionColor }}
            disableContextMenuItems={[
              ContextMenuItem.Strikethrough,
              ContextMenuItem.Comment,
              ContextMenuItem.Underline,
              ...(currentSelected
                ? []
                : [ContextMenuItem.Highlight, ContextMenuItem.Copy]),
            ]}
            annotationAdd={(evt: AnnotationAddEventArgs) => {
              const { annotationId, textMarkupContent } = evt;
              const newNote: Note = {
                annotationId: annotationId,
                highlightAreas: undefined,
                quote: textMarkupContent || "",
              };
              _exportAnnotation(annotationId).then((res) => {
                newNote.highlightAreas = res;
                const newReactions = reactions.map((reaction) => {
                  if (reaction.id === currentSelected) {
                    return {
                      ...reaction,
                      notes: reaction.notes.concat([newNote]),
                    };
                  }
                  return reaction;
                });
                setReactions(newReactions);
                navigator.clipboard.writeText(textMarkupContent || "");
              });
            }}
            annotationRemove={(evt: AnnotationAddEventArgs) => {
              const { annotationId } = evt;
              const newReactions = reactions.map((reaction) => {
                return {
                  ...reaction,
                  notes: reaction.notes.filter(
                    (note) => note.annotationId !== annotationId
                  ),
                };
              });
              setReactions(newReactions);
            }}
            toolbarSettings={{
              showTooltip: true,
              toolbarItems: [
                // "PageNavigationTool",
                "MagnificationTool",
                // "PanTool",
                "SelectionTool",
              ],
              annotationToolbarItems: [],
              formDesignerToolbarItems: [],
            }}
            enableAnnotationToolbar={false}
          >
            <Inject
              services={[
                Toolbar,
                Magnification,
                Navigation,
                Annotation,
                LinkAnnotation,
                ThumbnailView,
                TextSelection,
                TextSearch,
              ]}
            />
          </PdfViewerComponent>
        </div>
        <div
          style={{
            height: "75vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Flex
            align="center"
            gap={"4px"}
            style={{
              fontSize: "16px",
              flexGrow: 0,
              paddingLeft: "16px",
              userSelect: "none",
            }}
          >
            <strong>Current Annotation:</strong>
            {currentReactionColor && (
              <>
                <div
                  style={{
                    display: "inline-block",
                    width: "1em",
                    height: "1em",
                    backgroundColor: currentReactionColor,
                  }}
                ></div>
                <span>Reaction #{currentReactionIndex + 1}</span>
              </>
            )}
          </Flex>
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Collapse
              items={reactions.map((r, ind) => {
                return {
                  key: r.id,
                  label: (
                    <div style={{ maxWidth: "100%", userSelect: "none" }}>
                      <div
                        style={{
                          display: "inline-block",
                          width: "1em",
                          height: "1em",
                          backgroundColor: r.color,
                        }}
                      ></div>{" "}
                      Reaction #{ind + 1}
                    </div>
                  ),
                  extra: (
                    <>
                      <AntTooltip title={"Show/hidden annotation"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            const newReactions = reactions.map((reaction) => {
                              if (r.id === reaction.id) {
                                return {
                                  ...reaction,
                                  hidden: !reaction.hidden,
                                };
                              }
                              return reaction;
                            });
                            setReactions(newReactions);
                          }}
                          icon={
                            !r.hidden ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        />
                      </AntTooltip>
                      <AntTooltip title={"Set annotation"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            setCurrentSelected(r.id);
                          }}
                          icon={<AimOutlined spin={r.id === currentSelected} />}
                        />
                      </AntTooltip>
                      <AntTooltip title={"Clone reaction"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            handleCreateNewReaction(r.value);
                          }}
                          icon={<BlockOutlined />}
                        />
                      </AntTooltip>
                      <Popconfirm
                        title="Delete reaction"
                        description="Are you sure to delete this reaction?"
                        onConfirm={() => {
                          const newReactions = reactions.filter(
                            (reaction) => r.id !== reaction.id
                          );
                          setReactions(newReactions);
                          if (currentSelected === r.id) {
                            setCurrentSelected(newReactions[0]?.id);
                          }
                        }}
                        onCancel={(event) => {
                          event?.stopPropagation();
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </Popconfirm>
                    </>
                  ),
                  children: (
                    <>
                      <Flex gap="4px 0" wrap>
                        {r.notes.map((note, ind) => (
                          <AntTooltip
                            title={note.quote}
                            key={note.annotationId}
                          >
                            <Tag
                              key={note.annotationId}
                              color={r.color}
                              onClick={() => _selectAnnotation(note.annotationId)}
                              closable
                              style={{ cursor: "pointer", userSelect: "none" }}
                              onClose={() => {
                                const newNotes = r.notes.filter(
                                  (n) => n.annotationId !== note.annotationId
                                );
                                const newReactions = reactions.map(
                                  (reaction) => {
                                    if (r.id === reaction.id) {
                                      return {
                                        ...reaction,
                                        notes: newNotes,
                                      };
                                    }
                                    return reaction;
                                  }
                                );
                                _deleteAnnotation(note.annotationId);
                                setReactions(newReactions);
                              }}
                            >
                              #{ind + 1}:{" "}
                              {note.quote.length > 23
                                ? `${note.quote.slice(0, 20)}...`
                                : note.quote}
                            </Tag>
                          </AntTooltip>
                        ))}
                      </Flex>
                      <Divider />
                      <Formily
                        schema={schema}
                        value={r.value || {}}
                        onChange={(value) => handleChange(value, r.id)}
                      />
                    </>
                  ),
                };
              })}
              // onChange={(keys) => {}}
              // defaultActiveKey={[notes[0]?.id.toString()]}
            />
            <Flex justify="center" style={{ marginTop: "36px" }}>
              <AntButton
                type="primary"
                onClick={() => handleCreateNewReaction()}
              >
                Add reaction
              </AntButton>
            </Flex>
          </div>
        </div>
      </MoveableContainer>
    </div>
  );
};

export default HighlightExample;
