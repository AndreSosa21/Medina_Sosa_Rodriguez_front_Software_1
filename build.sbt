// build.sbt
ThisBuild / scalaVersion := "2.13.8"

enablePlugins(io.gatling.sbt.GatlingPlugin)

libraryDependencies ++= Seq(
  "io.gatling" % "gatling-core" % "3.9.5",
  "io.gatling.highcharts" % "gatling-charts-highcharts" % "3.9.5"
)
