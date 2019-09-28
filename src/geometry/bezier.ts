import * as Vector2D from "./vector-2d";

export interface ControlLine {
  readonly length: number;
  readonly angle: number;
}

export interface VertexProperty {
  readonly point: Vector2D.Unit;
  readonly controlLine: ControlLine;
}

export interface PathSegment {
  readonly controlPoint1: Vector2D.Unit;
  readonly controlPoint2: Vector2D.Unit;
  readonly targetPoint: Vector2D.Unit;
}

export interface Curve {
  readonly startPoint: Vector2D.Unit;
  readonly paths: readonly PathSegment[];
}

export const createCurve = (vertexPropertyList: readonly VertexProperty[]): Curve => {
  const paths: PathSegment[] = [];
  const len = vertexPropertyList.length;
  let previousVertex = vertexPropertyList[0];
  let previousControlLine = previousVertex.controlLine;

  for (let i = 1; i < len; i += 1) {
    const currentVertex = vertexPropertyList[i];
    const currentControlLine = currentVertex.controlLine;

    paths.push({
      controlPoint1: Vector2D.addPolar(previousVertex.point, 0.5 * previousControlLine.length, previousControlLine.angle),
      controlPoint2: Vector2D.subtractPolar(currentVertex.point, 0.5 * currentControlLine.length, currentControlLine.angle),
      targetPoint: currentVertex.point
    });

    previousVertex = currentVertex;
    previousControlLine = currentControlLine;
  }

  return {
    startPoint: vertexPropertyList[0].point,
    paths
  };
};
