<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <center><v-label class="title"><b>{{ $t('label.applicant_form_header') }}</b></v-label></center>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredInstanceType"
            >
              <v-label class="title"><b>{{ $t('label.instance_type') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instanceType"
                outlined
                :error-messages="errors"
                item-value="id"
                item-text="name"
                :items="faskesTypeList"
                :placeholder="$t('label.autocomplete_instance_placeholder')"
                @change="onSelectFaskesType"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredInstanceName"
            >
              <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instance"
                :items="faskesList"
                item-value="id"
                item-text="nama_faskes"
                single-line
                solo
                outlined
                :clearable="true"
                autocomplete
                :error-messages="errors"
                :placeholder="$t('label.example_instance_name')"
                @input.native="querySearchFaskes"
                @change="onSelectFaskes"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.instance_phone_number') }}</b></v-label>
              <v-text-field
                v-model="formApplicant.instancePhoneNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.example_phone_number')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredCityName"
            >
              <v-label class="title"><b>{{ $t('label.city_name') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.cityNameId"
                outlined
                :error-messages="errors"
                :items="applicantListCity"
                :placeholder="$t('label.autocomplete_city_placeholder')"
                @change="getListDistrict"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredDistrictName"
            >
              <v-label class="title"><b>{{ $t('label.district_name') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.districtNameId"
                outlined
                :error-messages="errors"
                :items="applicantListDistrict"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
                @change="getListVillage"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredVillageName"
            >
              <v-label class="title"><b>{{ $t('label.village_name') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.villageNameId"
                outlined
                :error-messages="errors"
                :items="applicantListVillage"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredFullAddress"
            >
              <v-label class="title"><b>{{ $t('label.full_address') }}</b> <i class="text-small">{{ $t('label.must_fill') }}</i></v-label>
              <v-textarea
                v-model="formApplicant.fullAddress"
                outlined
                :height="100"
                :no-resize="true"
                :error-messages="errors"
                :items="village"
                :placeholder="$t('label.example_full_address')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <div class="btn-desktop">
            <v-col cols="6" sm="6" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                color="primary"
                @click="onNext()"
              >{{ $t('label.next') }}</v-btn>
              <v-btn
                class="margin-positive"
                outlined
                text
                href="#/landing-page"
              >{{ $t('label.cancel') }}</v-btn>
            </v-col>
          </div>
          <div class="btn-mobile">
            <v-col cols="12" sm="12" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                color="primary"
                @click="onNext()"
              >{{ $t('label.next') }}</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                outlined
                text
                href="#/landing-page"
              >{{ $t('label.cancel') }}</v-btn>
            </v-col>
          </div>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'IdentitasInstansiPemohon',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      step: 1,
      nameFaskes: '',
      listQueryFaskes: {
        nama_faskes: null,
        id_tipe_faskes: null
      }
    }
  },
  computed: {
    ...mapGetters('region', [
      'applicantListCity',
      'applicantListDistrict',
      'applicantListVillage'
    ]),
    ...mapGetters('faskes', [
      'faskesList',
      'faskesDetail'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  async created() {
    await this.getListCity()
    await this.$store.dispatch('faskesType/getListFaskesType')
    await this.getListFaskes()
  },
  methods: {
    async onNext() {
      this.faskesTypeList.forEach(element => {
        if (element.id === this.formApplicant.instanceType) {
          this.formApplicant.instanceTypeName = element.name
        }
      })
      this.faskesList.forEach(element => {
        if (element.id === this.formApplicant.instance) {
          this.formApplicant.instanceName = element.nama_faskes
          return
        }
      })
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    async getListCity() {
      await this.$store.dispatch('region/getApplicantFormListCity')
      this.applicantListCity.forEach(element => {
        element.value = {
          id: element.kemendagri_kabupaten_kode,
          name: element.kemendagri_kabupaten_nama
        }
        element.text = element.kemendagri_kabupaten_nama
      })
    },
    async getListDistrict() {
      await this.$store.dispatch('region/getApplicantFormListDistrict', { city_code: this.formApplicant.cityNameId.id })
      this.applicantListDistrict.forEach(element => {
        element.value = {
          id: element.kemendagri_kecamatan_kode,
          name: element.kemendagri_kecamatan_nama
        }
        element.text = element.kemendagri_kecamatan_nama
      })
    },
    async getListVillage() {
      await this.$store.dispatch('region/getApplicantFormListVillage', { subdistrict_code: this.formApplicant.districtNameId.id })
      this.applicantListVillage.forEach(element => {
        element.value = {
          id: element.kemendagri_desa_kode,
          name: element.kemendagri_desa_nama
        }
        element.text = element.kemendagri_desa_nama
      })
    },
    async onSelectFaskesType(id) {
      this.listQueryFaskes.id_tipe_faskes = id
      await this.getListFaskes()
    },
    async getListFaskes() {
      await this.$store.dispatch('faskes/getListFaskes', this.listQueryFaskes)
    },
    async querySearchFaskes(event) {
      this.listQueryFaskes.nama_faskes = event.target.value
      await this.getListFaskes()
    },
    async onSelectFaskes(id) {
      if (id) {
        await this.$store.dispatch('faskes/getDetailFaskes', id)
      }
    }
  }
}
</script>
<style>
.main-card {
  margin-left: -50px;
  display: block;
}
.main-card-mobile {
  display: none;
}
.margin-negative {
  margin-top: -30px !important;
}
.text-small {
  font-size: 13px;
}
.margin-header-mobile {
  margin-top: -150px;
}
.margin-text-mobile-10 {
  margin-top: -10px;
  padding: 10px;
}
.margin-top-100 {
  margin-top: -100px !important;
}
.margin-top-80 {
  margin-top: -80px;
}
.margin-top-30 {
  margin-top: -30px;
}
.margin-input {
  margin-left: -130px;
  margin-right: -130px;
}
.float-right {
  float: right;
}
.btn-desktop {
  display:block;
}
.btn-mobile {
  display: none;
}
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
  .main-card {
    display: none;
  }
  .main-card-mobile {
    display: block;
  }
  .btn-desktop {
    display: none;
  }
  .btn-mobile {
    display: block;
  }
}
</style>