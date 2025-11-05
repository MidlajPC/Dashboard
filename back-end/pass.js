app.post("/pass", async (req, res) => {
  const { email,pass } = req.body;
  const usr = await userModel.findOne({ email: email });
  console.log(usr);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(pass.toString(), salt);

  await userModel.findOneAndUpdate(
    { email: email },
    { password: hashedPassword }
  );
  console.log(await userModel.findOne({email:email}))
  res.send("complete");
});