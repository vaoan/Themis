import { describe, it, expect } from "vitest";
import { loadRegistry, defaultRegistryPath } from "../src/lib/registry.mjs";

describe("registry", () => {
  // The shape, not the roster: `themis init` adds a body through a registry PR, and a test that
  // pinned the list would turn every such PR red. Membership is the registry's job, not this test's.
  it("has Themis as the only centre and AeleOS as the only star", () => {
    const { bodies } = loadRegistry();
    expect(Object.keys(bodies)[0]).toBe("themis");
    expect(Object.entries(bodies).filter(([, b]) => b.role === "centre").map(([n]) => n)).toEqual(["themis"]);
    expect(Object.entries(bodies).filter(([, b]) => b.role === "star").map(([n]) => n)).toEqual(["aeleos"]);
  });

  it("gives every body a kebab-case name, a vaoan repo, a role, and a class unless it is the centre", () => {
    const { bodies } = loadRegistry();
    for (const [name, body] of Object.entries(bodies)) {
      expect(name).toMatch(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
      expect(body.repo).toMatch(/^vaoan\/[A-Za-z-]+$/);
      expect(["centre", "star", "planet"]).toContain(body.role);
      if (body.role === "centre") expect(body.class).toBeNull();
      else expect(body.class).toBe("next-supabase-mono");
    }
  });

  it("carries no version field, by design", () => {
    const { bodies } = loadRegistry();
    for (const body of Object.values(bodies)) expect(body).not.toHaveProperty("version");
  });

  it("lives at the repository root", () => {
    expect(defaultRegistryPath.replaceAll("\\", "/")).toMatch(/\/registry\.json$/);
  });
});
