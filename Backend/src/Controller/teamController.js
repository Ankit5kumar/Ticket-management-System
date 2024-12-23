const Team = require("../models/Team");
const User = require("../models/User");

const TeamCreation = async (req, res) => {
  const { members, manager } = req.body;
  try {
    const IsManagerExist = await User.findById({ _id: manager });

    if (!IsManagerExist) {
      return res.status(404).json({ msg: "manager not found" });
    }

    const existingMembers = await User.find({ _id: { $in: members } });

    const existingMembersIds = existingMembers.map((user) =>
      user._id.toString()
    );

    const nonExistentMembers = members.filter(
      (memberid) => !existingMembersIds.includes(memberid)
    );

    if (nonExistentMembers.length > 0) {
      return res.status(404).json({
        msg: "The following members do not exist:",
        nonExistentMembers,
      });
    }
    const AlreadyinTeam = await Team.find({
      members: { $in: existingMembersIds },
    });

    if (AlreadyinTeam.length > 0) {
      return res.status(400).json({
        msg: "The following members are already part of the Team",
        duplicate: AlreadyinTeam,
      });
    }
    const result = await Team.create({
      members,
      manager,
    });
    return res.status(201).json({ message: "Team created", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

const getTeam = async (req, res) => {
  const managerid = req.user.id;
  try {
    const team = await Team.findOne({ manager: managerid });
    if (!team) return res.status(404).json({ msg: "team not found" });
    const members = await User.find({ _id: { $in: team.members }});

    return res.status(201).json({ msg: "This is your Team", team,members });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

module.exports = {
  TeamCreation,
  getTeam,
};
