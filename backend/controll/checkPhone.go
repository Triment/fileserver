package controll

import (
	"crypto/tls"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/Triment/eject"
)

func CheckoutPhone(c *eject.Context) {

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{
		Timeout:   15 * time.Second,
		Transport: tr,
	}
	res, err := client.Get("https://mdp-admin.yimidida.com/api/mdpEmp/getEmpWithoutUser?mobile=" + c.Params["phone"] + "&ymEmpCode=&status=0")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	c.Res.Write(data)
}
