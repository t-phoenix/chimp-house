const Hipostel = artifacts.require('HipostelToken')

module.exports = function(deployer){
    deployer.deploy(Hipostel);
}