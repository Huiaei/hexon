const { execaInherit, execaPipe } = require("./execa");

async function addAll() {
  await execaInherit("git", ["add", "."]);
}

async function listBranches() {
  const { stdout: branches } = await execaPipe("git", ["branch", "--list"]);
  return branches ? branches.split("\n").map((i) => i.slice(2)) : [];
}

async function getCurrentBranch() {
  const { stdout: branch } = await execaPipe("git", [
    "branch",
    "--show-current",
  ]);
  return branch;
}
async function reset(commit, hard = false) {
  await execaInherit("git", ["reset", commit].concat(hard ? ["--hard"] : []));
}

async function rebase(branch) {
  await execaInherit("git", ["rebase", branch]);
}

async function removeBranch(branch) {
  await execaInherit("git", ["branch", "-d", branch]);
}

async function forceRemoveBranch(branch) {
  await execaInherit("git", ["branch", "-D", branch]);
}

async function checkout(branch) {
  await execaInherit("git", ["checkout", branch]);
}

async function branchThenCheckout(branch) {
  await execaInherit("git", ["checkout", "-b", branch]);
}

async function merge(branch) {
  await execaInherit("git", ["merge", branch, "--no-ff", "--no-edit"]);
}

const format =
  '{%n  "commit": "%h",%n  "ref": "%D",%n  "date": "%aD",%n  "message": "%s"%n},%n';

async function listLog(count = 1) {
  const { stdout } = await execaPipe("git", [
    "log",
    `--pretty=format:${format}`,
    `-${count}`,
  ]);
  return JSON.parse("[" + stdout.slice(0, -1) + "]");
}

async function setUpstream(branch, remote) {
  await execaInherit("git", ["branch", branch, "-u", remote]);
}

async function addThenCommit(message) {
  await execaInherit("git", ["add", "."]);
  const { stdout: res } = await execaPipe("git", ["status", "-s"]);
  if (res) await execaInherit("git", ["commit", "-m", message]);
}

module.exports = {
  reset,
  addAll,
  listBranches,
  getCurrentBranch,
  removeBranch,
  forceRemoveBranch,
  branchThenCheckout,
  checkout,
  rebase,
  merge,
  listLog,
  setUpstream,
  addThenCommit,
};
