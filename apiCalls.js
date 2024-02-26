const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://rbtmxamyvubctvgejmbm.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidG14YW15dnViY3R2Z2VqbWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1NzEwOTcsImV4cCI6MjAyNDE0NzA5N30.BVmLh_fGtLM_v2_o82K5wNZuB26z2Ma1QksVk_TYK-Y";

const supabase = supa.createClient(supaUrl, supaAnonKey);

// #1. /api/seasons
app.get("/api/seasons", async (req, res) => {
  const { data, error } = await supabase.from("seasons").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/api/seasons

// #2. /api/circuits
app.get("/api/circuits", async (req, res) => {
  const { data, error } = await supabase.from("circuits").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/api/circuits

// #3. /api/circuits/ref
app.get("/api/circuits/:ref", async (req, res) => {
  const circRef = req.params.ref;

  if (typeof circRef === "string") {
    const { data, error } = await supabase
      .from("circuits")
      .select(`*`)
      .eq("circuitRef", circRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
// http://localhost:8080/api/circuits/monaco

// #4. /api/circuits/season/year
app.get("/api/circuits/season/:year", async (req, res) => {
  const seasonYear = req.params.year;

  if (!isNaN(seasonYear)) {
    const { data, error } = await supabase
      .from("races") //link between 2
      .select("circuitId, year, circuits (circuitRef, name, location, country)")
      .eq("year", seasonYear)
      .order("round", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
// http://localhost:8080/api/circuits/season/202a

// #5. /api/constructors
app.get("/api/constructors", async (req, res) => {
  const { data, error } = await supabase.from("constructors").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/Assign1/constructors

// #6. /api/constructors/ref
app.get("/api/constructors/:ref", async (req, res) => {
  const construRef = req.params.ref;

  if (typeof construRef === "string") {
    const { data, error } = await supabase
      .from("constructors")
      .select("*")
      .eq("constructorRef", construRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/Assign1/constructors/williams

// #7 /api/drivers
app.get("/api/drivers", async (req, res) => {
  const { data, error } = await supabase.from("drivers").select();

  // data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
//http://localhost:8080/api/drivers

// #8 /api/drivers/ref
app.get("/api/drivers/:ref", async (req, res) => {
  const drivRef = req.params.ref;

  if (typeof drivRef === "string") {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("driverRef", drivRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/drivers/hamilton

// #9 api/drivers/search/substring
app.get("/api/drivers/search/:substring", async (req, res) => {
  const substr = req.params.substring;

  if (typeof substr === "string") {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .ilike("surname", `${substr}%`);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/drivers/search/sch

// #10 api/drivers/race/raceId
app.get("/api/drivers/race/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("raceId", raceId);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/drivers/race/1106

// #11 api/races/raceId
app.get("/api/races/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("races")
      .select("circuits (name, location, country)")
      .eq("raceId", raceId);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/1106

// #12 /api/races/season/year
app.get("/api/races/season/:year", async (req, res) => {
  const year = req.params.year;

  if (!isNaN(year)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", year)
      .order("round", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/season/2020

// #13 /api/races/season/year/round
app.get("/api/races/season/:year/:round", async (req, res) => {
  const yeaR = req.params.year;
  const rounD = req.params.round;

  if (!isNaN(yeaR) || !isNaN(rounD)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", yeaR)
      .eq("round", rounD);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/season/2022/4

// #14 /api/races/circuits/ref
app.get("/api/races/circuits/:ref", async (req, res) => {
  const reF = req.params.ref;

  if (typeof reF === "string") {
    const { data, error } = await supabase
      .from("circuits")
      .select()
      .eq("circuitRef", reF);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/races/circuits/monza

app.get("/api/races/circuits/:ref/season/:start/:end", async (req, res) => {
  const ref = req.params.ref;
  const startYear = req.params.start;
  const endYear = req.params.end;

  if (typeof ref === "string" || !isNaN(startYear) || !isNaN(endYear)) {
    const { data, error } = await supabase
      .from("races")
      .select(`*, circuits !inner ()`)
      .gte("year", startYear)
      .lte("year", endYear)
      .eq("circuits.circuitRef", ref)
      .order("year", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid data type" });
  }
});
//http://localhost:8080/api/races/circuits/monza/season/2015/2020

// #16 /api/results/raceId
app.get("/api/results/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("results")
      .select(
        "drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef, nationality)"
      )
      .eq("raceId", raceId)
      .order("grid", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/Assign1/results/1106

// #17 /api/results/driver/ref
app.get("/api/results/driver/:ref", async (req, res) => {
  const driverR = req.params.ref;

  if (typeof driverR == "string") {
    const { data, error } = await supabase
      .from("results")
      .select(
        "*, drivers!inner(driverRef, code, forename, surname), constructors(name, constructorRef, nationality), races(name, round, year, date)"
      )
      .eq("drivers.driverRef", driverR);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  }
});
//http://localhost:8080/api/results/driver/hamilton

// NOT DONE YET
// #18 /api/results/driver/ref/seasons/start/end (still dont work)
app.get("/api/results/driver/:ref/seasons/:start/end", async (req, res) => {
  const ref = req.params.ref;
  const startYear = req.params.start;
  const endYear = req.params.end;

  const { data, error } = await supabase
    .from("results")
    .select(`drivers !inner (), races !inner ()`)
    .eq("drivers.driverRef", ref)
    .gte("races.year", startYear)
    .lte("races.year", endYear);
  res.send(data);
});
//http://localhost:8080/api/results/driver/sainz/seasons/2022/2022

// #19 /api/qualifying/raceId
app.get("/api/qualifying/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("qualifying")
      .select(
        "*, races(year, round, name), drivers (driverRef, code, forename, surname), constructors(constructorRef, name, nationality)"
      )
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    //if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/qualifying/1106

// #20 /api/standings/raceId/drivers
app.get("/api/standings/:raceid/drivers", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("driver_standings")
      .select(
        "points, position, wins, drivers (driverRef, number, code, forename, surname, nationality, url)"
      )
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    //if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/standings/1106/drivers

// #21 /api/standings/raceid/constructors
app.get("/api/standings/:raceid/constructors", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("constructor_standings")
      .select("points, position, wins, constructors (name, nationality, url)")
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/Assign1/standings/1106/constructors

app.listen(8080, () => {
  console.log("listening on port 8080");
});
